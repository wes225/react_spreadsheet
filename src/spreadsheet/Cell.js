import React from 'react'
import { ENTER_KEY, ESCAPE_KEY } from './misc/keys'
import {
    saveCell,
    editCell,
    toggleSelectCell,
    unSelectAll,
    cancelEditCellWithSave,
    getWeather
} from './../redux/actions'
import { connect } from 'react-redux'

class Cell extends React.Component {

    // Compares Cells 
    isTheSameCell(old, newCell) {
        return (old.value === newCell.value && old.isSelected === newCell.isSelected && old.inEdit === newCell.inEdit && old.tempValue === newCell.tempValue)
    }
    // prevents unecessary re-rendering using the previous func
    shouldComponentUpdate(nextProp) {
        return !this.isTheSameCell(this.props.cell, nextProp.cell)
    }
    handleCellKeyPress = e => {

        // To finish; will help editing once a case is selected.
        if (this.props.isSelected) {
            this
                .props
                .enterEditContent({
                    ...this.props.cell,
                    inEdit: true
                });
        } else if (this.props.cell.inEdit) {

            // Get Weather condition
            if (e.which === ENTER_KEY && e.ctrlKey) {
                if (this.props.cell.x<this.props.totalColumns){
                this
                    .props
                    .getContentWeather(e.target.value, this.props.cell)
                this
                    .props
                    .saveCellContent({
                        ...this.props.cell,
                        value: e.target.value,
                        inEdit: false
                    })}
            }
            // Saves change made to cell
            if (e.which === ENTER_KEY) {
                this
                    .props
                    .saveCellContent({
                        ...this.props.cell,
                        value: e.target.value,
                        inEdit: false
                    })
            }

            //Cancel changes
            if (e.which === ESCAPE_KEY) {
                this
                    .props
                    .cancelEditContent(false);
                this
                    .props
                    .unSelectAllContent();
            }
        }
    }

    //Enters edit mode for the cell
    handleDoubleClick = (e) => {
        this
            .props
            .cancelEditContent(true)
        this
            .props
            .enterEditContent({
                ...this.props.cell,
                inEdit: true
            });
        this
            .props
            .unSelectAllContent();
    }

    // Handles selected one or multiple cases.
    handleSingleClick = (e) => {
        this
            .props
            .cancelEditContent(true)
        if (e.ctrlKey) {
            this
                .props
                .toggleSelectContent({
                    ...this.props.cell,
                    inEdit: false,
                    isSelected: !this.props.cell.isSelected
                })
        } else {
            this
                .props
                .unSelectAllContent();
            this
                .props
                .toggleSelectContent({
                    ...this.props.cell,
                    inEdit: false,
                    isSelected: !this.props.cell.isSelected
                })
        }
    }

    // Saves current input, for when user clicks away to save
    onInputChange = e => {
        this
            .props
            .saveCellContent({
                ...this.props.cell,
                tempValue: e.target.value
            })
    }
    render() {
        return (
            <td onKeyDown={this.handleCellKeyPress}>{(this.props.cell.inEdit)
                ? <input
                    type="text"
                    onChange={this.onInputChange}
                    defaultValue={this.props.cell.value} />
                : this.props.cell.isSelected
                    ? <label
                        onClick={this.handleSingleClick}
                        onDoubleClick={this.handleDoubleClick}
                        style={{
                            border: '3px solid rgba(6, 150, 233, 0.815)'
                        }}>{this.props.cell.value}</label>
                    : <label onClick={this.handleSingleClick} onDoubleClick={this.handleDoubleClick}>{this.props.cell.value}</label>
            }</td>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.table[ownProps.y][ownProps.x],
    totalColumns:state.spreadsheetState.table[0].length
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