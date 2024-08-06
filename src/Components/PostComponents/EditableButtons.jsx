
export default function EditableButtons(props) {
    return (
        !props.isEditing ?
            <>
                <button 
                className="btn"
                onClick={props.onEditClick}>
               edit

                </button>
            </>

            :

            <>
                <button
                className="btn btn-success"
                    onClick={props.onSaveClick}>

               save

                </button>
                <button
                className="btn btn-danger"
                onClick={props.onDeleteClick}
                >
                delete
                </button>
                <button>
                    cancel
                </button>
            </>

    )
}