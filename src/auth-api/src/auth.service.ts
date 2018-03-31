import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import {
  Component,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AppConfigService } from '@my/api-shared';
import { Session } from '@my/db';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class AuthService {
  constructor(
    protected appConfig: AppConfigService,
    @Inject('JwtSecretToken') protected jwtSecret: string,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async startSession(userId: number): Promise<Session> {
    const expiresIn = this.appConfig.defaultSessionExpiresIn;
    const now = new Date();
    const expiresAt = moment(now)
      .add(expiresIn, 'seconds')
      .toDate();

    const newSession = this.sessionRepository.create({
      userId: userId,
      isValid: true,
      expiresIn: expiresIn,
      hits: 0,
      createdAt: now,
      lastTouch: now,
      expiresAt: expiresAt,
      hardExpirationDate: null,
    });

    const savedSession = await this.sessionRepository.save(newSession);
    return savedSession;
  }

  async createToken(
    payload: string | object | Buffer,
    expiresIn: number | string,
  ) {
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateSession(signedSession: SessionPayload): Promise<boolean> {
    if (signedSession == null || !Number.isInteger(signedSession.sid)) {
      console.error('Invalid signed session', signedSession);
      throw new BadRequestException('Invalid signed session');
    }

    const storedSession = await this.sessionRepository.findOneOrFail({
      id: signedSession.sid,
    });

    if (!storedSession.isValid) {
      throw new UnauthorizedException('Session is no longer valid');
    }

    // Determine if the session should be marked not valid
    const now = new Date();
    const hasSessionExpired =
      (storedSession.hardExpirationDate != null &&
        moment(now).isAfter(storedSession.hardExpirationDate)) ||
      moment(now).isAfter(storedSession.expiresAt) ||
      !moment(storedSession.expiresAt).isValid();

    if (hasSessionExpired) {
      storedSession.isValid = false;
      storedSession.invalidatedAt = now;
      await this.sessionRepository.save(storedSession);
    } else {
      // The session hasn't expired. Update the last touch
      storedSession.hits++; // TODO: This could have a race condition
      storedSession.lastTouch = now;
      storedSession.expiresAt = moment(now)
        .add(storedSession.expiresIn, 'seconds')
        .toDate();
      await this.sessionRepository.save(storedSession);
    }

    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}

interface SessionPayload {
  sid: number;
}
