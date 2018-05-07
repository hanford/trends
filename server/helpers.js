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

async function getUserBasicInfo (user) {
  const profile = await get(`https://github.com/${user}`)
  const { data: userProfile } = await profile

  if (!userProfile) return {}

  const $ = cheerio.load(userProfile)

  let response = {}

  response.image = getDataFromAttr('.avatar.width-full', 'src', $)
  response.full_name = getTextFromTag('.p-name.vcard-fullname', $)
  response.username = getTextFromTag('.p-nickname.vcard-username', $)

  console.log(response)

  return response
}

function getDataFromAttr (selector, attr, $) {
  const data = $(selector) ? $(selector)[0] : null
  let valueToReturn = null

  if (data) {
    const { attribs: { [attr]: value } } = data

    console.log({value})
    valueToReturn = value
  }

  return valueToReturn
}

function getTextFromTag (selector, $) {
  console.log($(selector).text())

  return $(selector).text()
}

function extractEmail (text) {
  return text.match(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g)
}

module.exports = {
  getEmailFromCommitPage,
  verifyIsUser,
  extractEmail,
  getUserBasicInfo
}
