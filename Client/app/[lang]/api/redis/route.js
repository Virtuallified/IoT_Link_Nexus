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
