export const TOGGLE_CELL_SELECT = "TOGGLE_CELL_SELECT"
export const SELECT_ALL = "SELECT_ALL";
export const UNSELECT_ALL = "UNSELECT_ALL";
export const SAVE_CELL_CONTENT = "SAVE_CELL_CONTENT";
export const DELETE_SELECTED_CELLS= "DELETE_SELECTED_CELLS";
export const EDIT_CELL="EDIT_CELL";
export const CANCEL_EDIT_CELL= "CANCEL_EDIT_CELL";
export const EDIT_SELECTED_CELL= "EDIT_SELECTED_CELLS";

export const saveCell = cell => ({type:SAVE_CELL_CONTENT,cell});
export const editCell = cell => ({type:EDIT_CELL,cell});
export const cancelEditCellWithSave = (save) => ({type:CANCEL_EDIT_CELL,save})
export const deleteSelectedCells = () => ({type:DELETE_SELECTED_CELLS});
export const toggleSelectCell = cell=>({type:TOGGLE_CELL_SELECT,cell})
export const selectAll = ()=> ({type:SELECT_ALL})
export const unSelectAll = ()=> ({type:UNSELECT_ALL})
export const editSelected = ()=>({type:EDIT_SELECTED_CELL})


// Weather Section
const apiKey = '8d76f2f18d23abbac32fec7038fb665c'
export function getWeather(city, requestingCell) {
    return dispatch => {
        let temp = getCityWeather(city);
        // Modifies the cell on the right of the city name
        let newX= requestingCell.x+1
        dispatch(saveCell({...requestingCell,x:newX,value:temp}))
    }
}

 async function getCityWeather(cityName) {
         try {
             fetch(`api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID={${apiKey}}`).then(response=> console.log(response))
             
         } catch (error) {
             console.log(error);
         }
     }