import Button from 'react-bootstrap/Button';

export default function SubmitButton(props){

 return(
        props.checkValue !== '' ?
        <>
        <Button variant="" id="button-addon2" type="submit"
            onClick={props.handleNewComment}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24px" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="send-Button">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>

          </Button>
        </>
        :
        <>
        <Button disabled  style={{ borderLeft: 'hidden', borderColor: 'rgb(100 111 122)'}}
        variant='' id="button-addon2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24px" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="send-Button">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>

          </Button>
        </>
    
        
    )

}
