import React from 'react'
import {
    saveCell,
    editCell,
    toggleSelectCell,
    unSelectAll,
    selectCell,
    cancelEditCellWithSave,
    getWeather,
    mouseEnterCell,
    mouseDown,
    mouseUp
} from './../redux/actions'
import {connect} from 'react-redux'
import {handleCellKeyPress, handleDoubleClick, onInputChange,handleMouseEnter,
handleMouseDown,
handleMouseUp} from './misc/eventHandlers'

class Cell extends React.Component {

    
    handleCellKeyPress = e => handleCellKeyPress(e, this.props)
    handleDoubleClick = e => handleDoubleClick(e, this.props)
    onInputChange = e => onInputChange(e, this.props)
    handleMouseEnter = e => handleMouseEnter(e, this.props)
    handleMouseDown = e => handleMouseDown(e, this.props)
    handleMouseUp = e => handleMouseUp(e, this.props)
    render() {
        return (
            <td
                
                onMouseEnter={this.handleMouseEnter}>{(this.props.cell.inEdit)
                    ? <input
                            autoFocus
                            type="text"
                            onKeyDown={this.handleCellKeyPress}
                            onChange={this.onInputChange}
                            defaultValue={this.props.cell.value}/>
                    : this.props.cell.isSelected
                        ? <label
                                tabIndex={-1}
                                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                                onKeyDown={this.handleCellKeyPress}
                                onDoubleClick={this.handleDoubleClick}
                                style={{
                                backgroundColor: 'rgba(6, 150, 233, 0.2)'
                            }}>{this.props.cell.value}</label>
                        : <label tabIndex={0} onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp} onDoubleClick={this.handleDoubleClick}>{this.props.cell.value}</label>
}</td>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.table[ownProps.y][ownProps.x],
    totalColumns: state.spreadsheetState.table[0].length,
    isMouseDown: state.spreadsheetState.isMouseDown
})
const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        saveCellContent: cell => dispatch(saveCell(cell)),
        enterEditContent: cell => dispatch(editCell(cell)),
        toggleSelectContent: cell => dispatch(toggleSelectCell({x: cell.x, y: cell.y})),
        selectContent: cell => dispatch(selectCell({x: cell.x, y: cell.y})),
        unSelectAllContent: () => dispatch(unSelectAll()),
        cancelEditContent: (save) => dispatch(cancelEditCellWithSave(save)),
        getContentWeather: (city, cell) => dispatch(getWeather(city, cell)),
        _mouseEnter: (cell) => dispatch(mouseEnterCell(cell)),
        d_mouseDown: (cell) => dispatch(mouseDown(cell)),
        d_mouseUp: (cell) => dispatch(mouseUp(cell))
    })
}

// Compares Cells
const isTheSameCell = (oldProp, newProp) => (oldProp.cell.value === newProp.cell.value && oldProp.cell.isSelected === newProp.cell.isSelected && oldProp.cell.inEdit === newProp.cell.inEdit && oldProp.cell.tempValue === newProp.cell.tempValue)

export default connect(mapStateToProps, mapDispatchToProps, null, {areStatePropsEqual: isTheSameCell})(Cell);
