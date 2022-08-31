import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ProxyModule } from '../../common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
