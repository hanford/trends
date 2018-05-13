import t from './actionTypes'
import document from 'global/document'
import fetch from 'isomorphic-fetch'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export const setLanguage = language => async dispatch => {
  await dispatch({ type: t.SET_LANGUAGE, language })
}

export const setTime = time => async dispatch => {
  await dispatch({ type: t.SET_TIME, time })
}

export const getTrending = () => async (dispatch, getState) => {
  const state = getState()

  const res = await fetch(`${publicRuntimeConfig.api}/trending?language=${state.language}&daysAgo=${state.time}`)
  const { repos } = await res.json()

  await dispatch({ type: t.SET_REPOS, repos })
}
