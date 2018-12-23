 import {ENTER_KEY, ESCAPE_KEY} from './keys'
 
 // Handles selected one or multiple cases.
 export const handleSingleClick = (e, props) => {
console.log(props)
     props
         .cancelEditContent(true)
     if (e.ctrlKey) {
         props
             .toggleSelectContent({
                 ...props.cell,
                 inEdit: false,
                 isSelected: !props.cell.isSelected
             })
     } else {
         props
             .unSelectAllContent();
         props
             .toggleSelectContent({
                 ...props.cell,
                 inEdit: false,
                 isSelected: !props.cell.isSelected
             })
     }
 }


 export const handleCellKeyPress = (e, props) => {


     // To finish; will help editing once a case is selected.
     if (props.cell.isSelected) {
         console.log(e)
         props
             .enterEditContent({
                 ...props.cell,
                 inEdit: true
             });
     } else if (props.cell.inEdit) {

         // Get Weather condition
         if (e.which === ENTER_KEY && e.ctrlKey) {
             if (props.cell.x < props.totalColumns) {
                 props
                     .getContentWeather(e.target.value, props.cell)
                 props
                     .saveCellContent({
                         ...props.cell,
                         value: e.target.value,
                         inEdit: false
                     })
             }
         }
         // Saves change made to cell
         if (e.which === ENTER_KEY) {
             props
                 .saveCellContent({
                     ...props.cell,
                     value: e.target.value,
                     inEdit: false
                 })
         }

         //Cancel changes
         if (e.which === ESCAPE_KEY) {
             props
                 .cancelEditContent(false);
             props
                 .unSelectAllContent();
         }
     }
 }

 //Enters edit mode for the cell
 export const handleDoubleClick = (e, props) => {
     props
         .cancelEditContent(true)
     props
         .enterEditContent({
             ...props.cell,
             inEdit: true
         });
     props
         .unSelectAllContent();
 }


 // Saves current input, for when user clicks away to save
 export const onInputChange = (e, props) => {
     props
         .saveCellContent({
             ...props.cell,
             tempValue: e.target.value
         })
 }