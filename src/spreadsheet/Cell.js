import React, {PureComponent} from 'react'

export default class Cell extends PureComponent {
    on
    render() {
        return (
            <td onClick={()=>console.log("single click")} onDoubleClick={()=>console.log("double click")} >{
            this.props.inEdit
            ? <input  type="text" defaultValue={this.props.value} onChange={()=>console.log("data changed")} onKeyDown={()=>console.log("keydown")}
            onKeyPress={()=>console.log("keypress")} onKeyUp={()=>console.log("keyup")}/>
            : <label>{this.props.value}</label>
        }</td> )
    }
}
