import { MongoClient } from "mongodb";
import database from "@/lib/db";

export async function POST(
  req: Request & { dbClient: MongoClient },
  res: Response,
) {
  const { chatId, topic, userId } = await req.json();
  await database(req, res);
  await req.dbClient.db("chats").collection("nextChatTopics").insertOne({
    chatId,
    topic,
    userId,
  });
  return Response.json({});
}
