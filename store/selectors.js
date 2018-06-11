import { createSelector } from 'reselect'
import { themes } from '../helpers/constants'

const getLanguages = state => state.languageOptions
const getLanguage = state => state.language

export const getTheme = createSelector(
  [getLanguages, getLanguage],
  (languages, language) => {
    const theme = Object.entries(languages).find(([key, value]) => value === language)

    return Array.isArray(theme) ? themes[theme[0]] : themes['Top Overall']
  }
)
