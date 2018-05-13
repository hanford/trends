import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import nextConnectRedux from 'next-connect-redux'

import reducer from './reducer'

export const initStore = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}

export const nextConnect = nextConnectRedux(initStore)
