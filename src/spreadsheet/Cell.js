import React from 'react'
import {ENTER_KEY, ESCAPE_KEY} from './misc/keys'
import {
    saveCell,
    editCell,
    toggleSelectCell,
    unSelectAll,
    cancelEditCellWithSave,
    getWeather
} from './../redux/actions'
import {connect} from 'react-redux'
import {handleSingleClick, handleCellKeyPress, handleDoubleClick, onInputChange} from './misc/eventHandlers'

class Cell extends React.Component {

   handleSingleClick = e => handleSingleClick(e, this.props)
    handleCellKeyPress = e => handleCellKeyPress(e, this.props)
    handleDoubleClick = e => handleDoubleClick(e, this.props)
    onInputChange = e => onInputChange(e, this.props)

   
    render() {
        console.log('render')
        return (
            <td >{(this.props.cell.inEdit)
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
                                onClick={this.handleSingleClick}
                                onDoubleClick={this.handleDoubleClick}
                                style={{
                                backgroundColor: 'rgba(6, 150, 233, 0.2)'
                            }}>{this.props.cell.value}</label>
                        : <label
                            tabIndex={0}
                            onClick={this.handleSingleClick}
                            onDoubleClick={this.handleDoubleClick}>{this.props.cell.value}</label>
}</td>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.table[ownProps.y][ownProps.x],
    totalColumns: state.spreadsheetState.table[0].length
})
const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        saveCellContent: cell => dispatch(saveCell(cell)),
        enterEditContent: cell => dispatch(editCell(cell)),
        toggleSelectContent: cell => dispatch(toggleSelectCell(cell)),
        unSelectAllContent: () => dispatch(unSelectAll()),
        cancelEditContent: (save) => dispatch(cancelEditCellWithSave(save)),
        getContentWeather: (city, cell) => dispatch(getWeather(city, cell))
    })
}

// Compares Cells
const isTheSameCell = (oldProp, newProp) => (oldProp.cell.value === newProp.cell.value && oldProp.cell.isSelected === newProp.cell.isSelected && oldProp.cell.inEdit === newProp.cell.inEdit && oldProp.cell.tempValue === newProp.cell.tempValue)

export default connect(mapStateToProps, mapDispatchToProps, null, {areStatePropsEqual: isTheSameCell})(Cell);
