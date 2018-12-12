import React, { PureComponent } from 'react'
import Cell from './Cell'
export default class Row extends PureComponent {
  render() {
    return (
      <tr>
        {this.props.row.map((cell, index) => <Cell key={index} {...cell}/>)}
      </tr>
    )
  }
}
