import { ApolloClient } from "apollo-boost";
import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../helpers/with-apollo";

interface Props {
  apolloClient: ApolloClient<{}>;
}

class TrendsApp extends App<Props> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApolloClient(TrendsApp);
