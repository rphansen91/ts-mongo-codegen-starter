import gql from 'graphql-tag'

export const rootSchema = gql`
  type User @collection(name: "users", crud: true) {
    id: ObjectId
    name: String
  }

  type Query {
    empty: String
  }

  type Mutation {
    empty: String
  }
`
