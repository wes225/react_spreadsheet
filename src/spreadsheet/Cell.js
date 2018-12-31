import React from 'react'
import {ENTER_KEY, ESCAPE_KEY} from './misc/keys'
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
import {handleSingleClick, handleCellKeyPress, handleDoubleClick, onInputChange} from './misc/eventHandlers'

class Cell extends React.Component {

    handleSingleClick = e => handleSingleClick(e, this.props)
    handleCellKeyPress = e => handleCellKeyPress(e, this.props)
    handleDoubleClick = e => handleDoubleClick(e, this.props)
    onInputChange = e => onInputChange(e, this.props)
    handleMouseEnter = () => this
        .props
        ._mouseEnter(this.props.cell)
    handleMouseDown = e => {
        this
            .props
            .d_mouseDown(this.props.cell)
        handleSingleClick(e, this.props)
    }
    handleMouseUp = e => {
        this
            .props
            .d_mouseUp(this.props.cell)

    }
    render() {
        return (
            <td
                x={this.props.x}
                y={this.props.y}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
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
                                onKeyDown={this.handleCellKeyPress}
                                onDoubleClick={this.handleDoubleClick}
                                style={{
                                backgroundColor: 'rgba(6, 150, 233, 0.2)'
                            }}>{this.props.cell.value}</label>
                        : <label tabIndex={0} onDoubleClick={this.handleDoubleClick}>{this.props.cell.value}</label>
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
