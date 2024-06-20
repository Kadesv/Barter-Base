export default function EditableText({ value, onValueChange, isEditing }) {
    return (
        !isEditing ?

            <>
                <div>
                    {value}
                </div>
            </>

            :

            <>
                <div>
                    <input
                        style={{textAlign: 'center'}}
                        size='sm'
                        plaintext
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                    />
                </div>
            </>

    )

}