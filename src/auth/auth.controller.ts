import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() registerData: RegisterDTO) {
    return this.authService.register(registerData);
  }
}
