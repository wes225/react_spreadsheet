import React, {PureComponent} from 'react'
import {ENTER_KEY} from './keys'

import {saveCell, editCell, toggleSelectCell, unSelectAll} from './../redux/actions'
import {connect} from 'react-redux'

class Cell extends PureComponent {  
    handleCellKeyPress = e => {
        if (e.which === ENTER_KEY){
                if (this.props.cell.inEdit) {
                    this
                        .props
                        .saveCellContent({
                            ...this.props.cell,
                            value: e.target.value,
                            inEdit: false
                        })
                }}
    }

    handleDoubleClick = () => this
        .props
        .enterEditContent({
            ...this.props.cell,
            inEdit: true
        })
    handleSingleClick = (e) => {
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

    render() {
        return (

            <td  onKeyPress={this.handleCellKeyPress} style={{
                width: "50px"
            }}>{(this.props.cell.inEdit)
                    ? <input
                            
                            style={{
                            width: "50px"
                        }}
                            type="text"
                            defaultValue={this.props.cell.value}/>
                    : this.props.cell.isSelected
                        ? <label
                               
                                onClick={this.handleSingleClick}
                                onDoubleClick={this.handleDoubleClick}
                                style={{
                                display: "inline-block",
                                border: "3px solid black",
                                width: "100%"
                            }}>{this.props.cell.value}</label>
                        : <label
                            onClick={this.handleSingleClick}
                            onDoubleClick={this.handleDoubleClick}
                            style={{
                            display: "inline-block",
                            border: "3px solid gray",
                            width: "100%"
                        }}>{this.props.cell.value}</label>
}</td>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.data[ownProps.y][ownProps.x]
})
const mapDispatchToProps = dispatch => {
    return ({
        saveCellContent: cell => dispatch(saveCell(cell)),
        enterEditContent: cell => dispatch(editCell(cell)),
        toggleSelectContent: cell => dispatch(toggleSelectCell(cell)),
        unSelectAllContent: () => dispatch(unSelectAll())
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);