import React, { PureComponent } from 'react'
import Cell from './CellV2'
export default class Row extends PureComponent {
  render() {
    return (
      <tr><th>{this.props.y}</th>
        {this.props.row.map((cell, index) => <Cell key={`${index},${this.props.y}`} y={this.props.y} x={index}/>)}
      </tr>
    )
  }
}
