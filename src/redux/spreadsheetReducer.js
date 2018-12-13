import {
   TOGGLE_CELL_SELECT,
    SAVE_CELL_CONTENT,
    DELETE_SELECTED_CELLS,
    EDIT_CELL,
    SELECT_ALL,
    UNSELECT_ALL,
} from './actions'


const INITIAL_STATE = {
    rows: 2,
    columns: 3,
    data: [
        [{
            isSelected: false,
            value: "100",
            x: 0,
            y: 0,
            inEdit: false
        }, {
            isSelected: false,
            value: "100",
            x: 1,
            y: 0,
            inEdit: false
        }, {
            isSelected: false,
            value: "100",
            x: 2,
            y: 0,
            inEdit: false
        }],
        [{
            isSelected: false,
            value: "100",
            x: 0,
            y: 1,
            inEdit: false
        }, {
            isSelected: false,
            value: "100",
            x: 1,
            y: 1,
            inEdit: false
        }, {
            isSelected: false,
            value: "100",
            x: 2,
            y: 1,
            inEdit: false
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

const deleteSelectedCells = (state) => {
    return Object.assign({}, { ...state,
        data: state.data.map((row, j) => {
            return row.map((cell, i) => {
                if (cell.isSelected) {
                    return {...cell, value:""};
                } else {
                    return cell;
                }
            })
        })
    })
}
const modifySelection = (state, status) => (Object.assign({}, { ...state,
    data: state.data.map((row, j) => {
        return row.map((cell, i) => {
            return { ...cell,
                isSelected: status
            }
        })
    })
}))
const save = (state, action) => modifyCell(state, action.cell)
const edit = (state, action) => modifyCell(state, action.cell)
const toggleSelect = (state, action) => modifyCell(state, action.cell)
const emptySelected = (state) => deleteSelectedCells(state)
const selectAll = (state) => modifySelection(state, true)
const unselectAll = (state) => modifySelection(state, false)


const spreadsheetReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_CELL_CONTENT:
            return save(state, action)
        case EDIT_CELL:
            return edit(state, action)
        case TOGGLE_CELL_SELECT:
            return toggleSelect(state, action)
       
        case DELETE_SELECTED_CELLS:
            return emptySelected(state)
        case SELECT_ALL:
            return selectAll(state)
        case UNSELECT_ALL:
            return unselectAll(state)
        default:
            return state;
    }
}

export default spreadsheetReducer;