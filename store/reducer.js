import t from './actionTypes'

const languages = {
  'Top Overall': encodeURIComponent('javascript language:python language:ruby language:go language:html language:css language:java language:scala language:swift language:php language:rust'),
  'Javascript': 'javascript',
  'Go': 'go',
  'Rust': 'rust',
  'Swift': 'swift',
  'Web': 'html language:css',
  'PHP': 'php',
  'CSS': 'css',
  'C': 'C',
  'Python': 'python',
  'Ruby': 'ruby',
  'Java': 'java',
  'Scala': 'scala'
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
