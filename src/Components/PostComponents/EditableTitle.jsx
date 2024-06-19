
export default function EditableTitle({ isEditing, value, onValueChange }) {
    return (
        !isEditing ?

            <>
                <div className="card card-title bold">
                    {value}
                </div>
            </>

            :

            <div className="card card-title"
            >
                <input
                className="input"
                    plaintext
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </div>
    )
}