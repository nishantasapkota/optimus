import { MongoClient, type Db } from "mongodb"

const fallbackUri = "mongodb://localhost:27017/optimus-new"
const uri = process.env.MONGODB_URI || fallbackUri
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient> | null = null

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

function getClientPromise(): Promise<MongoClient> {
  console.log("[MongoDB] Initializing client... Using URI:", process.env.MONGODB_URI ? "env" : "fallback")

  if (clientPromise) {
    return clientPromise
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the client across module reloads
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    // In production mode, create a new client
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }

  return clientPromise
}

export default function getMongoClient(): Promise<MongoClient> {
  return getClientPromise()
}

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("optimus-new")
}
