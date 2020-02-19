const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // 1 second
});

const redisSubscriber = redisClient.duplicate();

function fib(index) {
  if (index < 2) {
    return 1;
  }
  return fib(index - 1) + fib(index - 2);
}

// Watch for a new message inserted in redis, pull it, calculate fibbo and then put it back in redis
redisSubscriber.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(+message));
});
redisSubscriber.subscribe('insert');
