import {
    combineReducers
} from 'redux';
import spreadsheetReducer from './spreadsheetReducer'

const rootReducer = combineReducers({
    spreadsheetState: spreadsheetReducer
});

export default rootReducer;