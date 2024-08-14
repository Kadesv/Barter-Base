
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
                className="btn btn-success join-item"
                    onClick={props.onSaveClick}>
               save

                </button>
                <button
                className="btn btn-danger join-item"
                onClick={props.onDeleteClick}
                >
                delete
                </button>
                <button className="btn btn-warning join-item">
                    cancel
                </button>
            </>

    )
}