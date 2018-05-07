import t from './actionTypes'
import cookie from 'cookie-cutter'
import document from 'global/document'
import { get } from 'axios'

import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

console.log({publicRuntimeConfig})

const CookieJar = cookie(document)

export const requestRepos = () => dispatch => dispatch({ type: t.REQUEST_REPOS })
export const receiveRepos = () => dispatch => dispatch({ type: t.RECEIVE_REPOS })

export const setLanguage = language => async dispatch => {
  await dispatch({ type: t.SET_LANGUAGE, language })
}

export const setEmail = email => async dispatch => {
  await dispatch({ type: t.SET_EMAIL, email })
}

export const setTime = time => async dispatch => {
  await dispatch({ type: t.SET_TIME, time })
}

export const setAndFetchLanguage = language => async dispatch => {
  CookieJar.set('language', language)

  await dispatch(setLanguage(language))
  await dispatch(getTrending())
}

export const setAndFetchTime = time => async dispatch => {
  CookieJar.set('time', time)

  await dispatch(setTime(time))
  await dispatch(getTrending())
}

export const getTrending = () => async (dispatch, getState) => {
  const state = getState()

  await dispatch(requestRepos())

  const res = await get(`/trending?language=${state.language}&daysAgo=${state.time}`)
  const { repos } = await res.data

  await dispatch(receiveRepos())
  await dispatch({ type: t.SET_REPOS, repos })
}

export const fetchEmail = (repo) => async (dispatch, getState) => {
  await dispatch(requestRepos())

  const res = await get(`/fetch?repo=${window.encodeURIComponent(repo)}`)

  await dispatch(receiveRepos())

  const { email } = await res.data

  await dispatch(setEmail(email[0]))
}
