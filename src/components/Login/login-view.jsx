import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Navbar, Nav, Form, Button, Card, CardGroup, Col, Row, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
// SCSS Import
import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  //validation declarations 
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 2){
      setUsernameErr('Username must be 6 characters or longer');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 6){
      setPassword('Password must be 6 characters or longer');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
    /* Send a request to the server for authentication */
      axios.post('https://good-movies-origin.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    }  
  };

  return (
    <div className="login-view">
    <Container fluid style={{paddingTop: '0.75rem'}}>
      <Row>
        <Col>
          <CardGroup>
            <Card id="login-card" text="light" border="light">
              <Card.Body>
                <Card.Title>Welcome</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button variant="dark" style={{ color: "white", padding: "0.5rem", margin: "1.5rem" }} type="submit" onClick={handleSubmit}>
                    sign in
                    </Button>
                    <Link to={`/register`} className="float-right">
                      <Button variant="dark" style={{ color: "white", padding: "0.5rem", margin: "1.5rem"}} type="button"> sign up</Button>
                    </Link>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    </div> 
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};