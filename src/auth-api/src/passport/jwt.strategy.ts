import * as passport from 'passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Component()
export class JwtStrategy extends Strategy {
  constructor(
    protected readonly authService: AuthService,
    @Inject('JwtSecretToken') protected jwtSecret: string,
  ) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: jwtSecret,
      },
      async (req, payload, next) => await this.verify(req, payload, next),
    );
    passport.use(this);
  }

  public async verify(req: Request, payload: any, done: VerifiedCallback) {
    try {
      const isValid = await this.authService.validateUser(payload);
      if (!isValid) {
        return done('Unauthorized', false);
      }
    } catch (ex) {
      console.error('Unexpected error while verifying JWT Payload.', ex);
      return done('Unexpected Error', false);
    }
    done(null, payload);
  }
}
