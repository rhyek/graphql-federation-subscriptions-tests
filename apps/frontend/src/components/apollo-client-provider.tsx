import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  split,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { memo } from 'react';

const httpLink = new BatchHttpLink({
  uri: 'http://localhost:3000/graphql',
  batchMax: 10, // No more than 10 operations per batch
  batchInterval: 10, // Wait no more than 10ms after first batched operation
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3002/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export const ApolloClientProvider = memo(({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
});
