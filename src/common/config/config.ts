import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgresUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE,
    appUrl: process.env.APP_URL,
    appPort: process.env.APP_PORT,
  };
});
