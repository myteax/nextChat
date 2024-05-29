const { MongoClient, ServerApiVersion } = require("mongodb");
import { NextApiRequest, NextApiResponse } from "next";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`;
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export default async function database(
  req: (NextApiRequest | Request) & { dbClient: typeof MongoClient },
  res: NextApiResponse | Response,
) {
  if (!client) await client.connect();
  req.dbClient = client;
}
