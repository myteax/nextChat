import { MongoClient } from "mongodb";
import database from "@/lib/db";

export async function POST(
  req: Request & { dbClient: MongoClient },
  res: Response,
) {
  const { chatId, userId } = await req.json();
  await database(req, res);
  const result = await req.dbClient
    .db("chats")
    .collection("nextChats")
    .find(
      {
        chatId,
        userId,
      },
      {
        projection: {
          _id: 0,
          chatId: 0,
          userId: 0,
        },
      },
    )
    .toArray();

  return Response.json({
    chatMessages: result,
  });
}
