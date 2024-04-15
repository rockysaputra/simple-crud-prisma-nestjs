const Redis = require('ioredis');

export const client_redis = new Redis({
  password: process.env.redis_password,
  host: process.env.redis_host,
  port: 13784,
});