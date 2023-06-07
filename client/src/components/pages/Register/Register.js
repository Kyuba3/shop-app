import { useState } from "react"
import { API_URL } from "../../../config";
import Form from 'react-bootstrap/Form'
import { Alert, Button, Spinner } from "react-bootstrap";


const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
      }), 
    };

    setStatus('loading');
    fetch(`${API_URL}auth/register`, options)
      .then(res => {
        if (res.status === 201){
          setStatus('success');
        } else if (res.status === 400){
          setStatus('clientError');
        } else if (res.status === 409){
          setStatus('emailError');
        } else {
          setStatus('serverError');
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>

      <h1 className="my-4">Sign up</h1>

      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in...</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>No enought data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === 'loginError' && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation="border" role="status" className="d-flex justify-content-center block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control type="password" value={passwordRepeat} onChange={e => setPasswordRepeat(e.target.value)} placeholder="Repeat password" />
      </Form.Group>

      <Button variant="dark" type="submit" className="mb-3">
        Submit
      </Button>

    </Form>
  );
};

export default Register;