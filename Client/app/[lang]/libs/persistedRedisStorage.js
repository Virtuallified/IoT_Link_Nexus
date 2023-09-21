import { redisClient } from "@/app/[lang]/utils/redisUtils";

export default {
  getItem: async (key) => {
    const value = await redisClient.get(key);
    return JSON.parse(value);
  },
  setItem: async (key, value) => {
    await redisClient.set(key, JSON.stringify(value));
  },
  removeItem: async (key) => {
    await redisClient.del(key);
  },
  // Implement other methods as needed
};
