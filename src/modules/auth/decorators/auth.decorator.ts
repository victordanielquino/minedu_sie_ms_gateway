import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { ACGuard, Role, UseRoles } from 'nest-access-control';

import { AuthJwtGuard } from '../guards';

export const AuthDecorator = (...roles: Role[]) => {
  return applyDecorators(
    UseGuards(AuthJwtGuard, ACGuard),
    UseRoles(...roles),
    ApiBearerAuth(),
  );
};
