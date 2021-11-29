import { makeExecutableSchema } from '@graphql-tools/schema'
import { addResolveFunctionsToSchema } from 'apollo-server'
import { graphqlTypeDate, graphqlTypeObjectId, makeAugmentedSchema, mongoTypeDefs } from '@elevatejs/ts-mongo-codegen'
import { rootSchema } from './gql/root'

// Make an executable schema with the mongo types and our custom mountain schema type
const executableSchema = makeExecutableSchema({
  typeDefs: [mongoTypeDefs, rootSchema],
})

// Add CRUD operations to the Mountain type by augmenting the schema
export const schema = makeAugmentedSchema(executableSchema)

// The mountainResolvers, mountainMutationResolvers, and mountainQueryResolvers are generated types
// Run `yarn generate` to update types or add more
const resolvers = {
  Date: graphqlTypeDate,
  Mutation: {},
  ObjectId: graphqlTypeObjectId,
  Query: {},
}

// Finally we add our generated resolvers to the schema
addResolveFunctionsToSchema({
  resolvers,
  schema,
})
