import gql from "graphql-tag";
import { NextContext } from "next";
import React from "react";
import { Query } from "react-apollo";
import { Repo } from "../@types/graphql";
import Index from "../components/index";
import getQueryData from "../helpers/query-data";

interface Data {
  repos: Repo[];
}

interface Variables {
  language: string;
  time: number;
}

interface Props {
  children: React.ReactNode;
  language: string;
  time: number;
}

export default class IndexPage extends React.Component<Props> {
  static async getInitialProps(ctx: NextContext) {
    const { query } = ctx;
    const { language, time, dark } = getQueryData(query);

    return {
      time,
      language,
      dark
    };
  }

  render() {
    const { language, time, dark } = this.props;
    console.log(dark);

    return (
      <Query<Data, Variables> query={GET_REPOS} variables={{ language, time }}>
        {({ data }) => (
          <Index
            repos={(data && data.repos) || []}
            dark={dark}
            {...this.props}
          />
        )}
      </Query>
    );
  }
}

const GET_REPOS = gql`
  query trendingRepos($language: String!, $time: Int!) {
    repos(language: $language, time: $time) {
      id
      name
      forks
      language
      full_name
      description
      stargazers_count
    }
  }
`;
