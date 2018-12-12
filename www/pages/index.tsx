import gql from "graphql-tag";
import { NextContext } from "next";
import React from "react";
import { Query } from "react-apollo";
import Index from "../components/index";
import getQueryData from "../helpers/query-data";

interface Props {
  children: React.ReactNode;
  language: string;
  time: number;
}

export default class IndexPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextContext) {
    const { query } = ctx;
    const { language, time } = getQueryData(query);

    return {
      time,
      language
    };
  }

  render() {
    const { language, time } = this.props;

    return (
      <Query query={GET_REPOS} variables={{ language, time }}>
        {({ data: { repos } }) => <Index repos={repos} {...this.props} />}
      </Query>
    );
  }
}

const GET_REPOS = gql`
  query trendingRepos($language: String!, $time: Int!) {
    repos(language: $language, time: $time) {
      name
      forks
      language
      full_name
      description
      stargazers_count
    }
  }
`;
