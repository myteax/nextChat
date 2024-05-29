import { MongoClient } from "mongodb";
import database from "@/lib/db";

export async function POST(
  req: Request & { dbClient: MongoClient },
  res: Response,
) {
  const { userId } = await req.json();
  await database(req, res);
  const result = await req.dbClient
    .db("chats")
    .collection("nextChatTopics")
    .find(
      {
        userId,
      },
      {
        projection: {
          _id: 0,
          userId: 0,
        },
      },
    )
    .sort({ _id: -1 })
    .toArray();

  return Response.json({
    topics: result,
  });
}
