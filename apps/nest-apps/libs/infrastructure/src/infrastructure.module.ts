import { Module } from '@nestjs/common';
import { PubSub } from '@app/types';
import { redisPubSub } from './redis-pubsub';

@Module({
  providers: [
    {
      provide: PubSub,
      useValue: redisPubSub,
    },
  ],
  exports: [PubSub],
})
export class InfrastructureModule {}
