import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

export default function EditableTitle({ isEditing, value, onValueChange }) {
    return (
        !isEditing ?

            <>
                <Card.Title
                className="fw-bold">
                    {value}
                </Card.Title>
            </>

            :

            <Card.Title
            >
                <Form.Control
                className="fw-bold"
                    plaintext
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </Card.Title>
    )
}