import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { MongoClient } from "mongodb";
import database from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toAIStreamResponse();
}
