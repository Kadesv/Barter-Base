import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SignPage from './Pages/SignPage.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function HomeNav(props) {
  const navigate = useNavigate();
  const { signStatus, setSignStatus, username, setUsername } = props;
  const [showSign, setShowSign] = useState(false);


  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      setSignStatus(false);
      setUsername('Account')
      navigate('/');
    }
  };
  const handleSignStatus = () => setSignStatus(true);
  const handleClose = () => setShowSign(false);
  const handleShow = () => setShowSign(true);

  return (

    signStatus ?
      <Navbar expand="sm" id="homeNavBar"className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Ask Away Forums</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>

              <Offcanvas show={showSign} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <SignPage handleClose={handleClose} />
                </Offcanvas.Body>
              </Offcanvas>

              <Nav.Link href="/account"> {username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      :

      <Navbar expand="sm" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Ask Away Forums</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
              <Nav.Link onClick={handleShow}>Sign In</Nav.Link>

              <Offcanvas show={showSign} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Sign Page</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <SignPage handleClose={handleClose} setUsername={setUsername}handleSignStatus={handleSignStatus} />
                </Offcanvas.Body>
              </Offcanvas>
              <Nav.Link onClick={handleShow}>{username}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
