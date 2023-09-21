import { redisClient } from "@/app/[lang]/utils/redisUtils";

export const GET = async () => {
  try {
    // TODO: Testing with redis
    const cacheValue = await redisClient.get("user");
    if (cacheValue) {
      return new Response(cacheValue);
    }
    await redisClient.set("user", JSON.stringify("details"));
    return new Response(200);
  } catch (error) {
    return new Response(error);
  }
};
