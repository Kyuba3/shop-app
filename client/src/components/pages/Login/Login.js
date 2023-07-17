import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../../../config";
import { logIn } from "../../../redux/usersRedux";
import { useNavigate } from "react-router-dom";
import { Form, Spinner, Alert, Container } from "react-bootstrap";
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    try {
      const res = await fetch(`${API_URL}auth/login`, options);
      if (res.ok) {
        setStatus('success');
        dispatch(logIn({ email, password }));
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else if (res.status === 400) {
        setStatus('clientError');
        setTimeout(() => {
          setStatus(null);
        }, 1500);
      } else {
        setStatus('serverError');
        setTimeout(() => {
          setStatus(null);
        }, 1500);
      }
    } catch (err) {
      setStatus('serverError');
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <Form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.loginTitle}>Log in</h1>

        {status === "success" && (
          <Alert variant="success" className={styles.orderSuccessMessage}>
            <Alert.Heading className={styles.alert}>Success!</Alert.Heading>
            <p>You have been successfully logged in.</p>
          </Alert>
        )}

        {status === "serverError" && (
          <Alert variant="danger" className={styles.orderErrorMessage}>
            <Alert.Heading className={styles.alert}>Something went wrong...</Alert.Heading>
            <p>Unexpected error. Please try again later.</p>
          </Alert>
        )}

        {status === "clientError" && (
          <Alert variant="danger" className={styles.orderErrorMessage}>
            <Alert.Heading className={styles.alert}>Incorrect data</Alert.Heading>
            <p>Email or password are incorrect.</p>
          </Alert>
        )}

        {status === "loading" && (
          <Spinner animation="border" role="status" className={styles.spinner}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}

        <Form.Group controlId="formLogin">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </Form.Group>

        <button type="submit" className={styles.loginButton}>
          Sign in
        </button>
      </Form>
    </Container>
  );
};

export default Login;