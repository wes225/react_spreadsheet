export const SELECT_CASE = "CASE_SELECTED";
export const UNSELECT_CASE = "UNSELECT_CASE";
export const SAVE_CASE_CONTENT = "SAVE_CASE_CONTENT";
export const DELETE_CASE_CONTENT = "DELETE_CASE_CONTENT";
export const EDIT_CELL="EDIT_CELL";

export const saveCase = cell => ({type:SAVE_CASE_CONTENT,cell});
export const editCell = cell => ({type:EDIT_CELL,cell});
