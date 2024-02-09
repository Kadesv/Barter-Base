import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from "react-bootstrap/InputGroup";
import SubmitButton from "../Components/SubmitButton";
import ForumInput from "../Components/ForumComponents/ForumInput";
import axios from "axios";
import AccordionContext from 'react-bootstrap/AccordionContext';
import { upArrow, downArrow } from "../Components/Icon";
import { useOutletContext } from "react-router-dom";
import { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

function CustomToggle({ eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;
  const ToggleImage = isCurrentEventKey ? upArrow : downArrow;

  return (
    <Button
      variant="outline"
      onClick={decoratedOnClick}
    >
      <ToggleImage />
    </Button>
  );
}

export default function ForumDetailPage() {
  const { forum, comments } = useLoaderData();
  const { title, context } = forum;
  const navigate = useNavigate();

  const handleNewComment = async (event, formData) => {
    event.preventDefault();
    const res = await axios.post('/api/comments/new', formData);
    setCommentValue('');
    if (res.data.success) {
      navigate(`/forums/${forum.forumId}`);
    } else {
      //alert
    }
  };
  const signStatus = useOutletContext();
  const handleNewSubComment = async (event, formData) => {
    event.preventDefault();
    const res = await axios.post('/api/comments/newsub', formData);
    setSubCommentValue('');
    if (res.data.success) {
      navigate(`/forums/${forum.forumId}`);
    } else {
      //alert
    }
  };

  const [commentValue, setCommentValue] = useState('');
  const [subCommentValue, setSubCommentValue] = useState('');

  const subCommentList = (subComment, user) => {
    return (
      subComment.map((props) => {
        const { username } = user;
        return (

          <ListGroup.Item
            key={props.subCommentId}
          >
            <div className="ms-5 " >
              <div className="fw-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                {username}</div>
              {props.subCommentText}
            </div>
          </ListGroup.Item>

        )
      }))
  };


  const commentListItems = comments.map(({ user, commentText, commentId, subComments }) => (
    <Accordion.Item
      className=""
      eventKey={`${commentId}`}
      key={commentId}
    >
      <ListGroup
      >
        <ListGroup.Item
          variant="info"
          className="d-flex">
          <div className="ms-1 me-auto">
            <div className="fw-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="20px" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              {user.username}</div>
            {commentText}
          </div>
          <CustomToggle eventKey={`${commentId}`}
            data-id={commentId} variant="outline-info">

          </CustomToggle >
        </ListGroup.Item>


        {/* accordion on each comment */}
        <Accordion.Collapse eventKey={`${commentId}`}>
          <div>
            {/* subComment form */}
            <Form onSubmit={(e) => {
              handleNewSubComment(e, {
                subCommentText: subCommentValue,
                commentId: commentId
              })
            }}>
              <InputGroup >
                <ForumInput
                  text='Reply:'
                  signStatus={signStatus}
                  stateValue={subCommentValue}
                  setValue={(e) => setSubCommentValue(e.target.value)}
                />
                <SubmitButton
                  checkValue={subCommentValue}
                  handleNewComment={(e) => {
                    handleNewSubComment(e, {
                      subCommentText: subCommentValue,
                      commentId: commentId
                    })
                  }}
                />
              </InputGroup>
            </Form>
            {subCommentList(subComments, user)}

          </div>
        </Accordion.Collapse>
      </ListGroup>
    </Accordion.Item>
  ));

  return (
    <Container >
      <Card
        style={{ height: 'fit-content', minHeight: '25vh' }}>
        <Card.Header>
          <Card.Title variant="info">{title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {context}
          </Card.Text>
        </Card.Body>
      </Card>
      {/*comment form */}
      <Form >
        <InputGroup className="mb-3">
          <ForumInput
            text='What would you like to say?'
            signStatus={signStatus}
            stateValue={commentValue}
            setValue={(e) => setCommentValue(e.target.value)}
          />
          <SubmitButton
            checkValue={commentValue}
            handleNewComment={(e) => {
              handleNewComment(e, {
                commentText: commentValue,
                forumId: forum.forumId
              })
            }}
          />
        </InputGroup>
      </Form>
      <Accordion
        flush>
        {commentListItems}
      </Accordion>
    </Container>
  )
}