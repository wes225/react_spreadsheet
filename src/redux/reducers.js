import {
    combineReducers
} from 'redux';

const INITIAL_STATE = {
    data: [
        [{
            value: "100",
            x : "",
            y : "",
            inEdit:true
        }]
    ],


};

const spreadsheetReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
default:
      return state;
    }
}

const rootReducer = combineReducers({
    spreadsheetState: spreadsheetReducer
});

export default rootReducer;