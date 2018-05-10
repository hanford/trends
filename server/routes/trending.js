
const LRU =  require('hashlru')
const { get } = require('axios')
const { stringify } = require('querystring')
const { parse: parseURL } = require('url')

let cache = LRU(20)

const getSearchURL = searchParams => `https://api.github.com/search/repositories?${searchParams}`

module.exports = async (req, res) => {
  const { daysAgo = 7, language: lang, bust } = parseURL(req.url, true).query || {}

  const language = lang ? ` language:${lang}` : ''

  if (bust) {
    cache = LRU(20)
  }

  const startDate = new Date()

  startDate.setDate(startDate.getDate() - (daysAgo || 7))

  const startDateString = `
    ${startDate.getFullYear()}-${('0' + (startDate.getMonth()+1)).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}
  `.trim()

  const searchParams = unescape(stringify({
    sort: 'stars',
    order: 'desc',
    q: 'created:>' + startDateString + language,
    per_page: '100'
  }))

  const searchURL = getSearchURL(searchParams)

  console.log(searchURL)

  let repos = null
  let err = false

  try {
    repos = await loadRepos(searchURL)
  } catch (err) {
    console.error(err)
    err = true
  }

  if (err) {
    await res.status(500).send(err)
  } else {
    await res.send({ repos })
  }
}

const loadRepos = async (searchURL) => {
  if (cache.get(searchURL)) {
    return new Promise((resolve, reject) => resolve(cache.get(searchURL)))
  }

  const res = await get(searchURL, {headers: { Accept: 'application/vnd.github.preview' }})
  const { items } = await res.data

  cache.set(searchURL, items)

  return items
}
