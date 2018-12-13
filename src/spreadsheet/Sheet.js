import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Row from './Row'

import {A_KEY, DELETE_KEY,BACKSPACE_KEY} from './keys'

import {selectAll, deleteSelectedCells} from './../redux/actions'
class Sheet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      onMouseDown: false
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleKeyPress = e => {
    e.preventDefault();
    if (e.ctrlKey) {
      if(e.which===A_KEY) {
          this
            .props
            .selectAllContent()
      }
    }

    if (e.which === DELETE_KEY || e.which === BACKSPACE_KEY) {
      this
        .props
        .deletedSelectedContent({})
    }
  }

  render() {
    return (
      <table onKeyDown={this.handleKeyPress}>
        <tbody>
          {this
            .props
            .table
            .map((row, index) => <Row key={index} y={index} row={row}/>)}
        </tbody>
      </table>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return ({
    selectAllContent: () => dispatch(selectAll()),
    deletedSelectedContent: () => dispatch(deleteSelectedCells())
  })
}

const mapStateToProps = (state) => ({table: state.spreadsheetState.data})

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);