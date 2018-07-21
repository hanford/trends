const { makeExecutableSchema } = require('graphql-tools')
const fetch = require('isomorphic-unfetch')
const { stringify } = require('querystring')

const graphql = query => query.join('')

const typeDefs = graphql`
  type Query @cacheControl (maxAge: 36000) {
    repos(language: String! time: Int): [Repo]!
  }

  type Repo @cacheControl (maxAge: 36000) {
    forks: Int!
    name: String!
    language: String!
    full_name: String!
    description: String
    stargazers_count: Int!
  }
`

const resolvers = {
  Query: {
    async repos (root, args, context) {
      const { time = 7, language: lang } = args

      const language = lang ? ` language:${lang}` : ''

      const startDate = new Date()

      startDate.setDate(startDate.getDate() - time)

      const startDateString = `
        ${startDate.getFullYear()}-${('0' + (startDate.getMonth()+1)).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}
      `.trim()

      const searchParams = unescape(stringify({
        sort: 'stars',
        order: 'desc',
        q: 'created:>' + startDateString + language,
        per_page: '100',
        access_token: process.env.GITHUB_ACCESS_TOKEN
      }))

      const res = await fetch(`https://api.github.com/search/repositories?${searchParams}`, {headers: { Accept: 'application/vnd.github.preview' }})
      const data = await res.json()
      const items = await data.items

      return items
    }
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
