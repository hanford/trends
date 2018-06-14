import { PureComponent } from 'react'
import cookies from 'next-cookies'
import gql from 'graphql-tag'
import { graphql, Query } from 'react-apollo'

import Index from '../components/index'
import queryOrCookie from '../helpers/query-or-cookie'

class IndexPage extends PureComponent {
  static async getInitialProps (ctx) {
    const { query, req } = ctx
    const { language, time } = queryOrCookie(req.query, cookies(ctx))

    return {
      time,
      language
    }
  }

  render () {
    const { language, time } = this.props

    return (
      <Query query={GET_REPOS} variables={{ language, time }}>
        {({ data: { repos } }) => {
          return (
            <Index repos={repos} {...this.props} />
          )
        }}
      </Query>
    )
  }
}

const GET_REPOS = gql`
  query trendingRepos ($language: String! $time: Int!) {
    repos(language: $language time: $time) {
      name
      forks
      language
      full_name
      description
      stargazers_count
    }
  }
`
export default IndexPage
