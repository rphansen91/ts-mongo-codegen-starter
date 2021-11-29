import { port } from './options';
import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context, connect } from './context';

connect()
  .then(() => {
    console.log('Connected');
    return new ApolloServer({
      context,
      schema,
    }).listen(port);
  })
  .then(({ url }) => {
    console.log(`Listening at ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
