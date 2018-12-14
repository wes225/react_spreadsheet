import React from 'react'
import {
    saveCell,
    editCell,
    toggleSelectCell,
    unSelectAll,
    cancelEditCellWithSave,
    getWeather
} from './../redux/actions'
import {connect} from 'react-redux'
import {handleKeyPress,
isTheSameCell,
handleCellKeyPress,
handleDoubleClick,
handleSingleClick,
onInputChange} from './eventHandlers'

const  Cell = React.memo( (props) =>   console.log(props) || (
            <td onKeyDown={handleCellKeyPress}>{(props.cell.inEdit)
                    ? <input
                            type="text"
                            onChange={onInputChange}
                            defaultValue={props.cell.value}/>
                    : props.cell.isSelected
                        ? <label
                                onClick={handleSingleClick}
                                onDoubleClick={handleDoubleClick}
                                style={{
                                border: '3px solid rgba(6, 150, 233, 0.815)'
                            }}>{props.cell.value}</label>
                        : <label onClick={handleSingleClick} onDoubleClick={handleDoubleClick}>{props.cell.value}</label>
}</td>
        ) )
   


const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.table[ownProps.y][ownProps.x]
})
const mapDispatchToProps = dispatch => {
    return ({
        saveCellContent: cell => dispatch(saveCell(cell)),
        enterEditContent: cell => dispatch(editCell(cell)),
        toggleSelectContent: cell => dispatch(toggleSelectCell(cell)),
        unSelectAllContent: () => dispatch(unSelectAll()),
        cancelEditContent: (save) => dispatch(cancelEditCellWithSave(save)),
        getContentWeather: (city, cell) => dispatch(getWeather(city, cell))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);