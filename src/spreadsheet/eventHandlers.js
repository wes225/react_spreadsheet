import {
    ENTER_KEY,
    ESCAPE_KEY,
    A_KEY,
    DELETE_KEY,
    BACKSPACE_KEY
} from './misc/keys'

export const handleKeyPress = e => {

    if (e.ctrlKey) {
        if (e.which === A_KEY) {
            this
                .props
                .selectAllContent()
        }
    }
    if (e.which === DELETE_KEY || e.which === BACKSPACE_KEY) {
        this
            .props
            .deletedSelectedContent({})
    }
}



// Compares Cells 
export const isTheSameCell = (old, newCell) => (old.value === newCell.value && old.isSelected === newCell.isSelected && old.inEdit === newCell.inEdit && old.tempValue === newCell.tempValue)

// prevents unecessary re-rendering using the previous func

export const handleCellKeyPress = e => {

    // To finish; will help editing once a case is selected.
    if (this.props.isSelected) {
        this
            .props
            .enterEditContent({
                ...this.props.cell,
                inEdit: true
            });
    } else if (this.props.cell.inEdit) {

        // Get Weather condition
        if (e.which === ENTER_KEY && e.ctrlKey) {
            this
                .props
                .getContentWeather(e.target.value, this.props.cell)
            this
                .props
                .saveCellContent({
                    ...this.props.cell,
                    value: e.target.value,
                    inEdit: false
                })
        }
        // Saves change made to cell
        if (e.which === ENTER_KEY) {
            this
                .props
                .saveCellContent({
                    ...this.props.cell,
                    value: e.target.value,
                    inEdit: false
                })
        }

        //Cancel changes
        if (e.which === ESCAPE_KEY) {
            this
                .props
                .cancelEditContent(false);
            this
                .props
                .unSelectAllContent();
        }
    }
}

//Enters edit mode for the cell
export const handleDoubleClick = (e) => {
    this
        .props
        .cancelEditContent(true)
    this
        .props
        .enterEditContent({
            ...this.props.cell,
            inEdit: true
        });
    this
        .props
        .unSelectAllContent();
}

// Handles selected one or multiple cases.
export const handleSingleClick = (e) => {
    this
        .props
        .cancelEditContent(true)
    if (e.ctrlKey) {
        this
            .props
            .toggleSelectContent({
                ...this.props.cell,
                inEdit: false,
                isSelected: !this.props.cell.isSelected
            })
    } else {
        this
            .props
            .unSelectAllContent();
        this
            .props
            .toggleSelectContent({
                ...this.props.cell,
                inEdit: false,
                isSelected: !this.props.cell.isSelected
            })
    }
}

// Saves current input, for when user clicks away to save
export const onInputChange = e => {
    this
        .props
        .saveCellContent({
            ...this.props.cell,
            tempValue: e.target.value
        })
}