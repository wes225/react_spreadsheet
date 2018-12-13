import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Row from './Row'
class Sheet extends PureComponent {

  render() {
    return (
      <table>
          <tbody>
        {this.props.table.map((row,index) => <Row key={index}  y={index} row={row}/>)}
        </tbody>
      </table>
    )
  }
}


const mapStateToProps = (state) => ({
  table:state.spreadsheetState.data
})


export default connect(mapStateToProps)(Sheet); 