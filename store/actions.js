import t from './actionTypes'
import document from 'global/document'
import { get } from 'axios'
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

  const res = await get(`${publicRuntimeConfig.api}/trending?language=${state.language}&daysAgo=${state.time}`)
  const { repos } = await res.data

  await dispatch({ type: t.SET_REPOS, repos })
}
