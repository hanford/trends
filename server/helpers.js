const { get } = require('axios')
const cheerio = require('cheerio')
const wrap = require('await-wrap')

async function getEmailFromCommitPage (url) {
  const individualCommitPage = await get(url)
  const { data: individualPage } = await individualCommitPage

  const $ = cheerio.load(individualPage)

  const shaBtn = $('.sha.btn.btn-outline.BtnGroup-item') ? $('.sha.btn.btn-outline.BtnGroup-item')[0] : null

  if (!shaBtn) return

  const { attribs: { href } } = shaBtn

  if (!href) return

  const gitData = await get(`https://github.com${href}.patch`)
  const { data } = await gitData
  const email = extractEmail(data)

  return email
}

async function verifyIsUser (user) {
  console.log(`https://github.com/orgs/${user}/people`)

  const { err } = await wrap(get(`https://github.com/orgs/${user}/people`))

  return err !== undefined
}

function extractEmail (text) {
  return text.match(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g)
}

module.exports = {
  getEmailFromCommitPage,
  verifyIsUser,
  extractEmail
}
