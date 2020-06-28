import gql from 'graphql-tag'

export const rootSchema = gql`
  type Query {
    empty: String
  }

  type Mutation {
    empty: String
  }
`
