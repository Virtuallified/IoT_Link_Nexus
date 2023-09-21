import { Redis } from "ioredis";

export const getRedisURL = () => {
  if (process.env.NEXT_PUBLIC_REDIS_URL) {
    return process.env.NEXT_PUBLIC_REDIS_URL;
  }
  throw new Error("Redis URL not found");
};

export const redisClient = new Redis(getRedisURL());
