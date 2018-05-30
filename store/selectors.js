import { createSelector } from 'reselect'

const themes = {
  'Top Overall': '#673ab7',
  'Top Javascript': '#ff9800',
  'Top Go': '#00BCD4',
  'Top Rust': '#5d4037',
  'Top Swift': '#fd3024',
  'Top Web': '#009688',
  'Top PHP': '#6c70aa',
  'Top CSS': '#f44336',
  'Top C': '#3f51b5',
  'Top Python': '#607d8b',
  'Top Ruby': '#e91e63',
  'Top Java': '#795548',
  'Top Scala': '#ef1107'
}

const getLanguages = state => state.languageOptions
const getLanguage = state => state.language

export const getTheme = createSelector(
  [getLanguages, getLanguage],
  (languages, language) => {
    const theme = Object.entries(languages).find(([key, value]) => value === language)

    return Array.isArray(theme) ? themes[theme[0]] : themes['Top Overall']
  }
)
