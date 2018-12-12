import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore , applyMiddleware} from 'redux'
import rootReducers from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducers, applyMiddleware(loggerMiddleware, thunkMiddleware)
);



export default store;