import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos';
import { UserCreateDto } from '../user/dtos';

@ApiTags('API: AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() payload: LoginDto) {
    return await this.authService.signIn(payload);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserCreateDto) {
    return await this.authService.signUp(userDTO);
  }
}
