import { HttpLink, InMemoryCache, ApolloClient } from "apollo-boost";
import fetch from "isomorphic-fetch";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

let apolloClient = null;

if (!process.browser) {
  // Polyfill fetch() on the server (used by apollo-client)
  global.fetch = fetch;
}

function create(initialState) {
  const {
    ctx: { req }
  } = initialState;
  const url = publicRuntimeConfig.isDev
    ? "http://localhost:2999"
    : `https://${req.headers.host}`;

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: new HttpLink({
      uri: `${url}/api/graphql`,
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
