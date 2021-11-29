import { mongo } from './options';
import { MongoClient } from 'mongodb';
import { mongoCollectionFactory } from './types.generated';

const client = new MongoClient(mongo.uri);
const db = client.db(mongo.name);

export const collections = mongoCollectionFactory(db);

export const connect = async () => {
  await client.connect();
};

export const context = async () => {
  return collections;
};

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type IContext = ThenArg<ReturnType<typeof context>>;
