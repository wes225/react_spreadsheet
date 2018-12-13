import React, { PureComponent } from 'react'
import {
    ENTER_KEY,
    TAB_KEY,
    ESCAPE_KEY,
    DELETE_KEY,
    BACKSPACE_KEY
} from './keys'

import { saveCase,editCell } from './../redux/actions'
import { connect } from 'react-redux'

class Cell extends PureComponent {

    handleKeyPress = event => {if (event.which === ENTER_KEY){ (this.props.saveCaseContent({ ...this.props.cell, value: event.target.value, inEdit:false })) } }
    handleDoubleClick = () => this.props.enterEditContent({ ...this.props.cell, inEdit: true })
    handleSingleClick = event => console.log(this.props)
    render() {
        return (
            <td>{
                (this.props.cell.inEdit)
                    ? <input type="text" defaultValue={this.props.cell.value} onChange={() => console.log("data changed")} onKeyDown={() => console.log("keydown")}
                        onKeyPress={this.handleKeyPress} onKeyUp={() => console.log("keyup")} />
                    : <label  onDoubleClick={this.handleDoubleClick}>{this.props.cell.value}</label>
            }</td>)
    }
}

const mapStateToProps = (state,ownProps) =>({
    cell:state.spreadsheetState.data[ownProps.y][ownProps.x]
  })
const mapDispatchToProps = dispatch => {
    return ({
        saveCaseContent: cell => dispatch(saveCase(cell)),
        enterEditContent: cell => dispatch(editCell(cell)) 
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell);