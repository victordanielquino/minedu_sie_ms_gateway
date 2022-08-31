import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxyMineduSie } from '../../../common/proxy/client-proxy';
import { UserCreateDto, UserUpdateDto } from '../dtos';
import { Observable } from 'rxjs';
import { UserI } from '../../../common/interfaces';
import { UserMSG } from '../../../common/enums';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API: USUARIO')
@Controller('user')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyMineduSie) {}
  private _clientProxyUser = this.clientProxy.clientProxyUsers();

  @Get()
  findALl(): Observable<UserI[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<UserI[]> {
    return this._clientProxyUser.send(UserMSG.FIND_ONE, id);
  }

  @Post()
  create(@Body() userDTO: UserCreateDto): Observable<UserI> {
    return this._clientProxyUser.send(UserMSG.CREATE, userDTO);
  }

  @Put(':id')
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDTO: UserUpdateDto,
  ): Observable<UserI> {
    return this._clientProxyUser.send(UserMSG.UPDATE, { id, userDTO });
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this._clientProxyUser.send(UserMSG.DELETE, id);
  }
}
