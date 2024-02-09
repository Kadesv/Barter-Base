import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { useNavigate, useLoaderData, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import NewForumForm from '../Components/NewForumForm.jsx';
import axios from 'axios';

export default function BrowseForumsPage() {
  const navigate = useNavigate();
  const { forums } = useLoaderData();
  const signStatus = useOutletContext();
  //state
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const setAlertFalse = () => setAlert(false);
  //functions to change state
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //creating new forum
  const handleNewForum = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/forums/new', formData);

    if (res.data.success) {
      handleClose();
      navigate('/');
    } else {
      setAlert(true)
    }
  };


  const forumListItems = forums.map(({ user, forumId, title, context }) => (
    <Card size="xxl" key={forumId}
    className='m-5'
    >
      <Card.Header>
      <Card.Title >{title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {context}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Card.Subtitle className="fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px"
            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 
             0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 
             9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>{user.username}</Card.Subtitle>
        <Button size="sm" href={`/forums/${forumId}`}
          variant='outline-info'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24"
            viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 
            0v11.25" />
          </svg>
        </Button>
      </Card.Footer>
    </Card>
  ));

  return (
    alert ?
      <Container >
        <h1>Browser</h1>
        <Button
          variant="outline-info"
          onClick={handleShow}>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" height='24px'viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

          </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Forum Creation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Alert variant="warning" onClose={() => setAlert(false)} dismissible>
              <Alert.Heading>Please fill in all sections.</Alert.Heading></Alert>
            <NewForumForm signStatus={signStatus} setAlertFalse={setAlertFalse} />
          </Offcanvas.Body>
        </Offcanvas>
        {forumListItems}
      </Container>

      :

      <Container >
        <h1>Browser</h1>
        <Button
          variant="outline-info"
          onClick={handleShow}>
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" height='24px'viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

          </Button>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Forum Creation</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NewForumForm handleFormCreation={handleNewForum} />
          </Offcanvas.Body>
        </Offcanvas>
        {forumListItems}
      </Container>

  )
}