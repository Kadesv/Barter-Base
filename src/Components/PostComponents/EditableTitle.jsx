
export default function EditableTitle({ isEditing, value, onValueChange }) {
    return (
        !isEditing ?

            <>
                <div className="card card-title bold">
                    {value}
                </div>
            </>

            :

            <div className="card card-title bold"
            >
                <input
                className="input"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>
    )
}