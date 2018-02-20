const { get } = require('axios')
const cheerio = require('cheerio')
const wrap = require('await-wrap')
const { getEmailFromCommitPage, verifyIsUser, extractEmail } = require('../helpers')

module.exports = async function Top (req, res) {
  const { language } = req.query
  const resp = await get(`/trending?language=${language}&daysAgo=5`)
  const { data: { repos } } = await resp
  const topDevs = {}

    repos.forEach(({ stargazers_count, owner, full_name, name }) => {
      if (stargazers_count > 5) {
        topDevs[full_name] = {
          repo: name,
          user: owner.login,
          stars: stargazers_count,
          commitUrl: `https://github.com/${full_name}/commits?author=${owner.login}`
        }
      }
    })

  const top = await Promise.all(
    Object
      .entries(topDevs)
      .map(async ([_, value]) => {
        const email = await getEmailFromCommitPage(value.commitUrl)
        const isUser = await verifyIsUser(value.user)

        if (isUser && email) {
          return {
            ...value,
            email: email ? email[0] : ''
          }
        }
      })
  )

  return res.send({ top: top.filter(Boolean) })
}
