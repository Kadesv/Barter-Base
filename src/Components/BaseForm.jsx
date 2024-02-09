import Button from 'react-bootstrap/Button';

export default function BaseForm({ onSignIn, onSignUp }) {
    return (
            <>
                <h1>Welcome!</h1>
                <Button onClick={onSignIn}>Sign In</Button>
                <Button onClick={onSignUp}>Sign Up</Button>
            </>
    )

}