import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getAll(): any {
    return this.userService.getAll();
  }

  @Get('/:email')
  async getByEmail(@Param('email') email: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
