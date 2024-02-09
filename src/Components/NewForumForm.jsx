import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import {  useOutletContext } from 'react-router-dom';



export default function NewForumForm({ handleFormCreation }) {
    const [titleValue, setTitleValue] = useState('');
    const [contextValue, setContextValue] = useState('');
  const signStatus = useOutletContext();


    return (
        signStatus ?

            <Form className="newForumForm" onSubmit={(e) => {
                handleFormCreation(e, {
                    title: titleValue,
                    context: contextValue,
                })
            }}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Title"
                    className="mb-3"
                >
                    <Form.Control type="text"
                        placeholder="Title"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingContext"
                    label="Context"
                >
                    <Form.Control
                        className="newForumContext"
                        as="textarea" rows={15}
                        type="text"
                        placeholder="Context"
                        value={contextValue}
                        onChange={(e) => setContextValue(e.target.value)}
                    />
                </FloatingLabel>
                <Button
                    className='mb-3'
                    type='submit'>Submit</Button>

            </Form>

            :

            <>

                <Alert variant="warning" >
                    <Alert.Heading>You must be signed in.</Alert.Heading></Alert>

                <Form className="newForumForm" onSubmit={(e) => {
                    handleFormCreation(e, {
                        title: titleValue,
                        context: contextValue,
                    })
                }}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Title"
                        className="mb-3"
                    >
                        <Form.Control type="text"
                            placeholder="Title"
                            disabled
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        controlId="floatingContext"
                        label="Context"
                    >
                        <Form.Control
                            className="newForumContext"
                            as="textarea" rows={15}
                            type="text"
                            disabled
                        />
                    </FloatingLabel>
                    <Button
                        className='mb-3'
                        type='submit'
                        disabled>
                        Submit</Button>

                </Form>
            </>
    )
}