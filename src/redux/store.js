import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore , applyMiddleware} from 'redux'
import rootReducers from './reducers'

const loggerMiddleware = createLogger()

// Store with logger
// const store = createStore(
//     rootReducers, applyMiddleware(loggerMiddleware, thunkMiddleware)
// );
const store = createStore(
    rootReducers, applyMiddleware( thunkMiddleware)
);


export default store;