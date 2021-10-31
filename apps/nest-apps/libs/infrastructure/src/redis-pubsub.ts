import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options: Redis.RedisOptions = {
  host: 'localhost',
  port: 5488,
  retryStrategy: (times) => {
    // reconnect after:
    return Math.min(times * 50, 2000);
  }
};

export const redisPubSub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});
