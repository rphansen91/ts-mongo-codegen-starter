/* eslint-disable @typescript-eslint/no-var-requires */
import { makeExecutableSchema, addResolversToSchema } from '@graphql-tools/schema';
import { mergeResolvers } from '@graphql-tools/merge';
import { makeAugmentedSchema, mongoTypeDefs } from '@elevatejs/ts-mongo-codegen';
import { crudResolvers } from './types.generated';
import { resolve } from 'path';
import fs from 'fs';

const schemaPaths = readFullFilePaths('schemas');
const resolverPaths = readFullFilePaths('resolvers');

const typeDefs = [mongoTypeDefs];
const resolvers = [...crudResolvers];

schemaPaths.forEach((path) => {
  const schema = require(path).default;
  if (!schema) throw new Error(`No schema default export found at "${path}"`);
  typeDefs.push(schema);
});

resolverPaths.forEach((path) => {
  const resolver = require(path).default;
  if (!resolver) throw new Error(`No resolver default export found at "${path}"`);
  resolvers.push(resolver);
});

const executableSchema = makeExecutableSchema({
  typeDefs,
});

const augmentedSchema = makeAugmentedSchema(executableSchema);

export const schema = addResolversToSchema({
  resolvers: mergeResolvers(resolvers),
  schema: augmentedSchema,
});

function readFullFilePaths(type: string) {
  const dir = resolve(__dirname, type);
  return fs.readdirSync(dir).map((filename) => resolve(dir, filename));
}
