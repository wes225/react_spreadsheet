export const TOGGLE_CELL_SELECT = "TOGGLE_CELL_SELECT"
export const SELECT_ALL = "SELECT_ALL";
export const UNSELECT_ALL = "UNSELECT_ALL";
export const SAVE_CELL_CONTENT = "SAVE_CELL_CONTENT";
export const DELETE_SELECTED_CELLS= "DELETE_SELECTED_CELLS";
export const EDIT_CELL="EDIT_CELL";

export const saveCell = cell => ({type:SAVE_CELL_CONTENT,cell});
export const editCell = cell => ({type:EDIT_CELL,cell});
export const deleteSelectedCells = () => ({type:DELETE_SELECTED_CELLS});
export const toggleSelectCell = cell=>({type:TOGGLE_CELL_SELECT,cell})
export const selectAll = ()=> ({type:SELECT_ALL})
export const unSelectAll = ()=> ({type:UNSELECT_ALL})