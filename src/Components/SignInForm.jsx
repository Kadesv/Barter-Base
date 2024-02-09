import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


export default function SignInForm({ onCancel, handleSignIn }) {

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return (

        <>
            <Form onSubmit={(e) => {
                handleSignIn(e, {
                    email: emailValue,
                    password: passwordValue,
                })
            }}>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email"
                        placeholder="name@example.com"
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                >
                    <Form.Control type="password"
                        placeholder="Password"
                        value={passwordValue}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                </FloatingLabel>
                <Button 
                className='mb-3'
                type='submit'>Sign In</Button>
                <Button
                className="mb-3"
                onClick={onCancel}>Cancel</Button>
            </Form>
            
        </>

    )
}

