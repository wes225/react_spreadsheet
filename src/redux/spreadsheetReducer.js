import {
    SELECT_CASE,
    UNSELECT_CASE,
    SAVE_CASE_CONTENT,
    DELETE_CASE_CONTENT,
    EDIT_CELL,
    saveCase
} from './actions'


const INITIAL_STATE = {
    rows: 2,
    columns: 3,
    data: [
        [{
            value: "100",
            x: 0,
            y: 0,
            inEdit: true
        }, {
            value: "100",
            x: 1,
            y: 0,
            inEdit: true
        }, {
            value: "100",
            x: 2,
            y: 0,
            inEdit: true
        }],
        [{
            value: "100",
            x: 0,
            y: 1,
            inEdit: true
        }, {
            value: "100",
            x: 1,
            y: 1,
            inEdit: true
        }, {
            value: "100",
            x: 2,
            y: 1,
            inEdit: true
        }]
    ],


};

const modifyCell = (state, newCell) => {
    return Object.assign({}, { ...state,
        data: state.data.map((row, j) => {
            return row.map((cell, i) => {
                if (newCell.x === i && newCell.y === j) {
                    
                    return newCell;
                } else {
                    return cell;
                }
            })
        })
    })
}
const save = (state, action) => modifyCell(state, action.cell)
const edit = (state, action) => modifyCell(state, action.cell)


const spreadsheetReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_CASE_CONTENT:
            return Object.assign({}, save(state, action))
        case EDIT_CELL:
            return Object.assign({}, edit(state, action))
        default:
            return state;
    }
}

export default spreadsheetReducer;