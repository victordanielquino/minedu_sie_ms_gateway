import { Module } from '@nestjs/common';

import { ClientProxyMineduSie } from './client-proxy';

@Module({
  providers: [ClientProxyMineduSie],
  exports: [ClientProxyMineduSie],
})
export class ProxyModule {}
