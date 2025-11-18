import Redis from "ioredis";
import env from "./env.js";

const redis = new Redis(env.REDIS.URI, {
  username: env.REDIS.USERNAME,
  password: env.REDIS.PASSWORD,
  lazyConnect: true,
  enableAutoPipelining: true,
});

redis.on("error", (e) => {
  console.log("[AUTH] failed to connect to Redis:", e?.message || e);
});

const connectRedis = async () => {
  await redis.connect();
  await redis.ping();
  console.log("[AUTH] x Redis connected.");
};

export { redis, connectRedis };
