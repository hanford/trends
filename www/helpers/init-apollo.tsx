import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "apollo-boost";
import fetch from "isomorphic-fetch";

let apolloClient: ApolloClient<{}> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(host: string, initialState: NormalizedCacheObject | null) {
  const url =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:2999";

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: `${url}/api/graphql`,
      credentials: "same-origin"
    }),
    cache: new InMemoryCache().restore(initialState || {})
  });
}

export default function initApollo(
  host: string,
  initialState: NormalizedCacheObject | null
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(host, initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(host, initialState);
  }

  return apolloClient;
}
