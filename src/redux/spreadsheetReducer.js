import {
    TOGGLE_CELL_SELECT,
    SAVE_CELL_CONTENT,
    SELECT_CELL,
    DELETE_SELECTED_CELLS,
    EDIT_CELL,
    SELECT_ALL,
    UNSELECT_ALL,
    CANCEL_EDIT_CELL,
    ON_MOUSE_DOWN,
    ON_MOUSE_UP,
    MOUSE_ENTER_CELL
} from './actions'

import {
    config
} from '../spreadsheet/misc/tableConfig'


//TODO: Refactor reducer using array of selected cells.
const initializeState = (rows, columns, cell) => {

    let table = [];
    for (let i = 0; i < rows; i++) {
        let column = [];
        for (let j = 0; j < columns; j++) {
            column.push({ ...cell,
                tempValue: cell.value,
                x: j,
                y: i
            })
        }

        table.push(column)
    }
    return {
        table,
        columns,
        rows,
        selectedCells: [],
        isMouseDown: false,
        selectionSquare: {}

    };
}

const INITIAL_STATE = initializeState(config.rows, config.columns, config.cell)


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
const cancelCellEdit = (state, save) => {
    return Object.assign({}, { ...state,
        table: state.table.map((row, j) => {
            return row.map((cell, i) => {
                if (cell.inEdit) {
                    if (save) {
                        return { ...cell,
                            value: cell.tempValue,
                            inEdit: false
                        };
                    } else {
                        return {
                            ...cell,
                            value: "",
                            tempValue: "",
                            inEdit: false

                        }
                    }
                } else {
                    return cell;
                }
            })
        })
    })
}

const toggleCell = (state, coord) => {
    return Object.assign({}, { ...state,
        table: state.table.map((row, j) => {
            return row.map((cell, i) => {
                if (coord.x === i && coord.y === j) {
                    return { ...cell,
                        isSelected: !cell.isSelected
                    };
                } else {
                    return cell;
                }
            })
        })
    })
}

const selectCell = (state, coord) => {
    return Object.assign({}, { ...state,
        table: state.table.map((row, j) => {
            return row.map((cell, i) => {
                if (coord.x === i && coord.y === j) {

                    return { ...cell,
                        isSelected: true
                    };
                } else {
                    return cell;
                }
            })
        })
    })
}

const changeCoveredCells = (state, square) => {
    let cells = state.table;
    return cells.map((row, y) => row.map((cell, x) => {
        if (x >= square.x0 && x <= square.x1) {
            if (y >= square.y0 && y <= square.y1) {
                return { ...cell,
                    isSelected: true
                }
            } else return {...cell,isSelected:false}
        } else return {...cell,isSelected:false}
    }))

}
const mouseEnterCell = (state, action) => {
    if (state.isMouseDown) {
        const newSquare = getSelectionSquare(state.selectionSquare, action.cell)
        const newTable = changeCoveredCells(state, newSquare.selectionSquare)
        return { ...state,
            table: newTable,
            selectionSquare: { ...newSquare.selectionSquare
            }
        }
    } else {
        return state
    }
}
const getSelectionSquare = (selectionSquare, newCell) => {

    if (Object.keys(selectionSquare).length !== 0) {
        let {
            x0,
            x1,
            y0,
            y1,
            _x,_y
        } = selectionSquare;
        if (newCell.x>_x){
            if(newCell.y<=_y){
                x0=_x
                x1=newCell.x
                y0=newCell.y
                y1=_y
            }
            else{
                y0=_y
                x1=newCell.x
                y1=newCell.y
            }
        }
        else if(newCell.x<=_x){
                if(newCell.y<=_y){
                    x0=newCell.x
                    x1=_x
                    y0=newCell.y
                    y1=_y
            }
            else  {
                x0=newCell.x
                x1=_x
                y1=newCell.y
            }
        }
        return {
                selectionSquare: {
                   x0: x0,
                    x1: x1,
                    y0: y0,
                    y1: y1,
                    _x:_x,
                    _y:_y
                }
            }
    }
}

const save = (state, action) => modifyCell(state, action.cell)
const edit = (state, action) => modifyCell(state, action.cell)
const toggleSelect = (state, action) => toggleCell(state, action.coord)
const select = (state, action) => selectCell(state, action.coord)
const cancel = (state, action) => cancelCellEdit(state, action.save)

const emptySelected = (state) => deleteSelectedCells(state)
const selectAll = (state) => modifySelection(state, true)
const unselectAll = (state) => modifySelection(state, false)

const mouseDown = (state,cell) => (Object.assign({}, { ...state,
    isMouseDown: true,
            selectionSquare: {
                x0: cell.x,
                x1: cell.x,
                y0: cell.y,
                y1: cell.y,
                _x: cell.x,
                _y: cell.y,
                
            
        
    }
}))
const mouseUp = (state,cell) => (Object.assign({}, { ...state,
    isMouseDown: false, selectionSquare:{}
}))

const spreadsheetReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_CELL_CONTENT:
            return save(state, action)
        case EDIT_CELL:
            return edit(state, action)
        case TOGGLE_CELL_SELECT:
            return toggleSelect(state, action)
        case SELECT_CELL:
            return select(state, action)

        case DELETE_SELECTED_CELLS:
            return emptySelected(state)
        case SELECT_ALL:
            return selectAll(state)
        case UNSELECT_ALL:
            return unselectAll(state)
        case CANCEL_EDIT_CELL:
            return cancel(state, action)
        case ON_MOUSE_DOWN:
            return mouseDown(state,action.cell)
        case ON_MOUSE_UP:
            return mouseUp(state, action.cell)
        case MOUSE_ENTER_CELL:
            return mouseEnterCell(state, action)
        default:
            return state;
    }
}

export default spreadsheetReducer;