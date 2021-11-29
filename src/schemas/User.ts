import gql from 'graphql-tag';

export default gql`
  type User @collection(name: "users", crud: true) {
    id: ObjectId
    name: String
  }
`;
