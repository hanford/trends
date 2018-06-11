import t from './actionTypes'
import { languages, times } from '../helpers/constants'

const initialState = {
  repos: [],
  language: languages['Top Overall'],
  time: times['Past Week'],
  timeOptions: times,
  languageOptions: languages
}

export default (state = initialState, action) => {
  switch (action.type) {

    case t.SET_REPOS:
      return {
        ...state,
        repos: action.repos
      }

    case t.SET_LANGUAGE:
      return {
        ...state,
        language: action.language
      }

    case t.SET_TIME:
      return {
        ...state,
        time: action.time
      }

    default:
      return state
  }
}
