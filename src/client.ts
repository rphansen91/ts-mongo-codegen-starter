import { port } from './options';
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: `http://localhost:${port}`,
});
