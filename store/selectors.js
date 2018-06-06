import { createSelector } from 'reselect'

const themes = {
  'Top Overall': '#673ab7',
  'Javascript': '#ff9800',
  'Go': '#00BCD4',
  'Rust': '#5d4037',
  'Swift': '#fd3024',
  'Web': '#009688',
  'PHP': '#6c70aa',
  'CSS': '#f44336',
  'C': '#3f51b5',
  'Python': '#607d8b',
  'Ruby': '#e91e63',
  'Java': '#795548',
  'Scala': '#ef1107'
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
