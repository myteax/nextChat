import { MongoClient } from "mongodb";
import database from "@/lib/db";

export async function POST(
  req: Request & { dbClient: MongoClient },
  res: Response,
) {
  const { messages } = await req.json();
  await database(req, res);
  await req.dbClient.db("chats").collection("nextChats").insertMany(messages);
  return Response.json({});
}
