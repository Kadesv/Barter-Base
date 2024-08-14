export default function EditableText({ value, onValueChange, isEditing }) {
    return (
        !isEditing ?

            <>
                <div className="card card-body">
                    {value}
                </div>
            </>

            :

            <>
                <div>
                    <input
                id="contextInput"

                        className="input"
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                    />
                </div>
            </>

    )

}