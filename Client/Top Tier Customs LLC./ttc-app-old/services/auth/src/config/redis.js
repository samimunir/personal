// import Redis from "ioredis";
// import { env } from "./env.js";

// export const redis = new Redis(env.redisUrl, { lazyConnect: true });
// export async function connectRedis() {
//   await redis.connect();
//   console.log("Redis connected → auth");
// }

import { createClient } from "redis";

export const redis = createClient({
  username: "default",
  password: "36so1mJoZzjgCBt7ckfdylmdUPBmvo2T",
  socket: {
    host: "redis-13639.c273.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 13639,
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export async function connectRedis() {
  await redis.connect();
  await redis.ping();
  console.log("Redis connected -> api/auth");
}
