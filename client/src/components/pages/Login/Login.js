import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logIn } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Spinner, Alert } from "react-bootstrap";


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    };

    setStatus('loading');
    fetch(`${API_URL}auth/login`, options)
      .then(res => {
        if (res.status === 201 || res.status === 200){
          setStatus('success');
          dispatch(logIn({ email, password }));
          setTimeout(() => {
            navigate('/');
          }, 1000);
        } else if (res.status === 400){
          setStatus('clientError');
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

      <h1 className="my-4">Log in</h1>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully logged</p>
        </Alert>
      )}

      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected err... Try again</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Incorrect data</Alert.Heading>
          <p>Email or password are incorrect...</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto justify-content-center">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    
      <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>

      <Button variant="dark" type="submit" className="w-50">
        Sign in
      </Button>

    </Form>
  );
};

export default Login;