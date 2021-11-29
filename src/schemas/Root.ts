import gql from 'graphql-tag';

export default gql`
  type Query {
    empty: String
  }

  type Mutation {
    empty: String
  }
`;
