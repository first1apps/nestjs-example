import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Component, Inject } from '@nestjs/common';
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
    const expiresIn = this.appConfig.defaultSessionMinutes;
    const now = new Date();
    const expiresAt = moment(now)
      .add(expiresIn, 'minutes')
      .toDate();

    const newSession = this.sessionRepository.create({
      userId: userId,
      isValid: true,
      lifeSpanMinutes: expiresIn,
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

  async validateUser(signedUser): Promise<boolean> {
    console.log(signedUser);
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }
}
