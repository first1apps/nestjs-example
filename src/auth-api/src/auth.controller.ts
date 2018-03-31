import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken() {
    const savedSession = await this.authService.startSession(123);
    const payload = { sid: savedSession.id };
    const token = await this.authService.createToken(payload, savedSession.lifeSpanMinutes);
    return token;
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
