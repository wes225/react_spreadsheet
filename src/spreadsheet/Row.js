import React, { PureComponent } from 'react'
import Cell from './Cell'
export default class Row extends PureComponent {
  render() {
    return (
      <tr style={{
                                padding:"0",margin:"0"
                            }}>
        {this.props.row.map((cell, index) => <Cell key={`${index},${this.props.y}`} y={this.props.y} x={index}/>)}
      </tr>
    )
  }
}
