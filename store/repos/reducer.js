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
  'Past Week': 8,
  'Past Day': 2,
  'Past Month': 32,
  'Past Year': 365
}

const initialState = {
  repos: [],
  language: languages['Top Overall'],
  time: time['Past Week'],
  loading: false,
  timeOptions: time,
  languageOptions: languages,
  email: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case t.REQUEST_REPOS:
      return {
        ...state,
        loading: true
      }

    case t.RECEIVE_REPOS:
      return {
        ...state,
        loading: false
      }

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

    case t.SET_EMAIL:
      return {
        ...state,
        email: action.email
      }

    default:
      return state
  }
}
