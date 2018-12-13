import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore , applyMiddleware} from 'redux'
import rootReducers from './reducers'

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducers, applyMiddleware(loggerMiddleware, thunkMiddleware) +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



export default store;