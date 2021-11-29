import { config } from 'dotenv'
import { MongoClient } from 'mongodb'
import { mongoCollectionFactory } from './types.generated'

config()

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const name = process.env.MONGO_NAME || 'test'

if (!uri) throw new Error('Mongo connection string not found, add MONGO_URI to .env')
if (!name) throw new Error('Mongo name string not found, add MONGO_NAME to .env')

const client = new MongoClient(uri)
const db = client.db(name)

export const collections = mongoCollectionFactory(db)

export const connect = async () => {
  await client.connect()
}

export const context = async () => {
  // Executed every request
  // const db = (await mongoConnection).db(name)
  return collections
}

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type IContext = ThenArg<ReturnType<typeof context>>
