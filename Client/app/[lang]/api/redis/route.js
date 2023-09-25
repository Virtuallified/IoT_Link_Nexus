import { NextResponse } from "next/server";
import { redisClient } from "@/app/[lang]/utils/redisUtils";

// export const revalidate = 6;

export const GET = async (req, res) => {
  try {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const uid = params.get("uid");
    const cacheValue = await redisClient.get(uid);

    if (cacheValue) {
      return new Response(cacheValue);
    }

    return new Response(
      JSON.stringify({ message: "No user found in redis cache" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(error);
  }
};

export const POST = async (req, res) => {
  try {
    const requestBody = await req.json();

    if (!requestBody || typeof requestBody !== "object") {
      throw new Error("Invalid request body");
    }

    const { uid } = requestBody;
    const userObj = JSON.stringify(requestBody);
    const res = await redisClient.set(uid, userObj);

    return NextResponse.json(res).status(200);
  } catch (error) {
    return new Response(error.message, { status: 400 }); // Return a 400 Bad Request status for invalid requests.
  }
};

export const DELETE = async (req, res) => {
  try {
    const params = new URLSearchParams(req.url.split("?")[1]);
    const uid = params.get("uid");
    // Attempt to delete the user data from Redis
    const deletedCount = await redisClient.del(uid);

    if (deletedCount === 1) {
      // User data was deleted successfully
      return new Response(
        JSON.stringify({
          success: true,
          message: "User data deleted from Redis cache.",
        })
      );
    } else {
      // User data was not found in Redis cache
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found in Redis cache.",
        })
      );
    }
  } catch (error) {
    // Handle any errors that may occur during the deletion
    return new Response(error.message, { status: 400 });
    throw error; // You can choose to handle the error differently if needed
  }
};
