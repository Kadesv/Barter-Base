import Form from 'react-bootstrap/Form';

export default function ForumInput(props) {
    return (
        props.signStatus ?
            <Form.Floating >
                <Form.Control
                    
                    placeholder=""
                    id="subCommentInput"
                    value={props.stateValue}
                    onChange={props.setValue}
                />
                <label
                    className="ms-4 me-auto"
                    htmlFor="subCommentInput">{props.text}</label>
            </Form.Floating>

            :

            <Form.Floating >
                <Form.Control
                    readOnly
                    placeholder=""
                    id="subCommentInput"
                    value={props.stateValue}
                    onChange={props.setValue}
                />
                <label
                    className="ms-4 me-auto"
                    htmlFor="subCommentInput">{props.text}<span style={{ color: 'gray', fontSize: '12px' }}> <svg xmlns="http://www.w3.org/2000/svg" height='20px' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                        must be signed in</span></label>
            </Form.Floating>
    )
}