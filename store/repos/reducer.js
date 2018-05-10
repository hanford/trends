import t from './actionTypes'

const languages = {
  'Top Overall': encodeURIComponent('javascript language:python language:ruby language:go language:html language:css language:java'),
  'Top Javascript': 'javascript',
  'Top Go': 'go',
  'Top Web': 'html language:css',
  'Top CSS': 'css',
  'Top C#': encodeURIComponent('C#'),
  'Top Python': 'python',
  'Top Ruby': 'ruby',
  'Top Java': 'java'
}

const time = {
  'Past Day': 2,
  'Past Week': 8,
  'Past Month': 32,
  'Past Year': 365
}

const initialState = {
  repos: [],
  language: languages['Top Overall'],
  time: time['Past Week'],
  timeOptions: time,
  languageOptions: languages,
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
