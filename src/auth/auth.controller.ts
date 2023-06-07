import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Delete,
} from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerData: RegisterDTO) {
    return this.authService.register(registerData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);
    res.cookie('auth', tokens, { httpOnly: true });
    res.send({
      message: 'success',
    });
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Request() req, @Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'Logout succesful',
    });
  }
}
