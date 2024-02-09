import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
export default function EditableText({ value, onValueChange, isEditing }) {
    return (
        !isEditing ?

            <>
                <Card.Text>
                    {value}
                </Card.Text>
            </>

            :

            <>
                <Card.Text>
                    <Form.Control
                        style={{textAlign: 'center'}}
                        size='sm'
                        plaintext
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                    />
                </Card.Text>
            </>

    )

}