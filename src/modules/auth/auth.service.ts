import { Injectable } from '@nestjs/common';
import { ClientProxyMineduSie } from '../../common/proxy/client-proxy';
import { JwtService } from '@nestjs/jwt';
import { UserMSG } from '../../common/enums';
import { lastValueFrom } from 'rxjs';
import { UserCreateDto } from '../user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly _clientProxy: ClientProxyMineduSie,
    private readonly _jwtService: JwtService,
  ) {}

  _clientProxyUser = this._clientProxy.clientProxyUsers();

  // METODO DE VALIDACION:
  async validateUser(username: string, password: string) {
    /*const user = await this._clientProxyUser
      .send(UserMSG.VALID_USER, {
        username,
        password,
      })
      .toPromise();*/
    const user = await lastValueFrom(
      this._clientProxyUser.send(UserMSG.VALID_USER, {
        username,
        password,
      }),
    );
    if (user) return user;
    return null;
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return { access_token: this._jwtService.sign(payload) };
  }

  async signUp(userDTO: UserCreateDto) {
    // return await this._clientProxyUser.send(UserMSG.CREATE, userDTO).toPromise();
    return await lastValueFrom(
      this._clientProxyUser.send(UserMSG.CREATE, userDTO),
    );
  }
}
