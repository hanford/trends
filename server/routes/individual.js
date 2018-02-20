const { get } = require('axios')
const cheerio = require('cheerio')
const wrap = require('await-wrap')
const { getEmailFromCommitPage, verifyIsUser, extractEmail } = require('../helpers')

module.exports = async function fetchEmail (req, res) {
  const { repo } = req.query
  const resp = await get(`https://github.com/${repo}/commits/master`)
  const { data: commitPage } = await resp

  const $ = cheerio.load(commitPage)
  const authors = {}

  $('.commit-author.tooltipped.tooltipped-s.user-mention').each(function(i, elem) {
    const author = $(this).text()

    return authors[author] !== undefined ? authors[author]++ : authors[author] = 0
  })

  let biggestContributor = {value: 0}

  Object.entries(authors).forEach(([key, value]) => {
    if (value > biggestContributor.value) {
      biggestContributor = {
        name: key,
        value
      }
    }
  })

  const url = `https://github.com/${repo}/commits?author=${biggestContributor.name}`

  const email = await getEmailFromCommitPage(url)

  return res.send({ email })
}
