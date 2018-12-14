import {
    TOGGLE_CELL_SELECT,
    SAVE_CELL_CONTENT,
    DELETE_SELECTED_CELLS,
    EDIT_CELL,
    SELECT_ALL,
    UNSELECT_ALL,
    CANCEL_EDIT_CELL
} from './actions'

import {config} from '../spreadsheet/misc/tableConfig'


//TODO: Refactor reducer using array of selected cells.
const initializeState = (rows,columns,cell) => {

    let table=[];
     for( let i=0 ; i<rows ;i++){
        let column =[];
        for (let j=0; j<columns;j++){
            column.push({...cell,tempValue:cell.value,x:j,y:i})
        }
      
        table.push(column)
    }
    return {table,columns,rows, selectedCells:[]};
}

const INITIAL_STATE = initializeState(config.rows,config.columns,config.cell)


const modifyCell = (state, newCell) => {
    return Object.assign({}, { ...state,
        table: state.table.map((row, j) => {
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
        table: state.table.map((row, j) => {
            return row.map((cell, i) => {
                if (cell.isSelected) {
                    return { ...cell,
                        value: ""
                    };
                } else {
                    return cell;
                }
            })
        })
    })
}

const modifySelection = (state, status) => (Object.assign({}, { ...state,
    table: state.table.map((row, j) => {
        return row.map((cell, i) => {
            return { ...cell,
                isSelected: status
            }
        })
    })
}))
const cancelCellEdit  = (state, save) => {
    return Object.assign({}, { ...state,
        table: state.table.map((row, j) => {
            return row.map((cell, i) => {
                if (cell.inEdit) {
                    if (save){
                    return { ...cell,
                        value: cell.tempValue, inEdit:false
                    };} else {
                        return {
...cell,
                        value: "", tempValue:"", inEdit:false
                    
                        }
                    }
                } else {
                    return cell;
                }
            })
        })
    })
}
const save = (state, action) => modifyCell(state, action.cell)
const edit = (state, action) => modifyCell(state, action.cell)
const toggleSelect = (state, action) => modifyCell(state, action.cell)
const cancel = (state,action) => cancelCellEdit(state,action.save)

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
        case CANCEL_EDIT_CELL:
            return cancel(state,action)
        default:
            return state;
    }
}

export default spreadsheetReducer;