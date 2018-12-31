import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Row from './Row'
import {A_KEY, DELETE_KEY,BACKSPACE_KEY} from './misc/keys'
import {selectAll, deleteSelectedCells, toggleSelectCell, selectCell} from './../redux/actions'
import TableHeader from './misc/TableHeader';

import './css/Sheet.css';
class Sheet extends PureComponent {

handleKeyPress = e => {

  if (e.ctrlKey) {
    if (e.which === A_KEY) {
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
      <thead><TableHeader columns={this.props.data.columns}/></thead>
        <tbody>
          
          {this
            .props
            .data.table
            .map((row, index) => <Row key={index} y={index} row={row}/>)}
        </tbody>
      </table>
    )
  }
}



const mapDispatchToProps = dispatch => {
  return ({
    selectAllContent: () => dispatch(selectAll()),
    deletedSelectedContent: () => dispatch(deleteSelectedCells()),
    toggleSelectContent: (x,y) => dispatch(toggleSelectCell({x:x, y:y})),
    selectContent: (x,y) => dispatch(selectCell({x:x, y:y})),


  })
}

const mapStateToProps = (state) => ({data: state.spreadsheetState})

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);