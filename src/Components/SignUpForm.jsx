import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


export default function SignUpForm({ onCancel, handleSignUp }) {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');

    return (
        <>
            <Form onSubmit={(e) => {
                handleSignUp(e, {
                    email: emailValue,
                    password: passwordValue,
                    username: usernameValue
                });
            }}
            >
                <FloatingLabel
                    controlId="floatingEmail"
                    label="Email address"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="name@example.com"
                        onChange={(e) => setEmailValue(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingUsername"
                    label="Username"
                    className="mb-3"
                >

                    <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUsernameValue(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-3"
                >

                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text>
                </FloatingLabel>

                <Button
                    className='mb-3'
                    type='submit'>Sign Up</Button>
                <Button
                    className="mb-3"
                    onClick={onCancel}>Cancel</Button>
            </Form>
        </>
    )
}