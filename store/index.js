import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import nextConnectRedux from 'next-connect-redux'

import reducer from './repos/reducer'

export const initStore = (initialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}

export const nextConnect = nextConnectRedux(initStore)
