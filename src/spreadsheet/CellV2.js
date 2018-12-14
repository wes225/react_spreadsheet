
import React from 'react'
import {ENTER_KEY, ESCAPE_KEY} from './misc/keys'
import {
    saveCell,
    editCell,
    toggleSelectCell,
    unSelectAll,
    cancelEditCellWithSave,
    getWeather
} from './../redux/actions'
import {connect} from 'react-redux'
export const  Cell = React.memo(function MyComponent(props) {
   console.log("render")
   console.log(props)
   return (<label onClick={(e)=>props.unSelectAllContent()}>{props.cell.value}</label>)
  });


const mapStateToProps = (state, ownProps) => ({
    cell: state.spreadsheetState.table[ownProps.y][ownProps.x]
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