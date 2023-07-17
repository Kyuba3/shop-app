import React, { useState } from "react";
import { API_URL } from "../../../config";
import Form from 'react-bootstrap/Form';
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.scss';

const Register = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

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
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (res.status === 400){
          setStatus('clientError');
          setTimeout(() => {
            setStatus(null);
          }, 1500);
        } else if (res.status === 409){
          setStatus('emailError');
          setTimeout(() => {
            setStatus(null);
          }, 1500);
        } else {
          setStatus('serverError');
          setTimeout(() => {
            setStatus(null);
          }, 1500);
        }
      })
      .catch(err => {
        setStatus('serverError');
      });
  }

  return (
    <Form className={styles.registerForm} onSubmit={handleSubmit}>

      <h1 className={styles.registerTitle}>Sign up</h1>

      {status === 'success' && (
        <Alert variant="success" className={styles.orderSuccessMessage}>
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You will be directed to Login page in a few seconds</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger" className={styles.orderErrorMessage}>
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger" className={styles.orderErrorMessage}>
          <Alert.Heading>No enought data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === 'emailError' && (
        <Alert variant="warning" className={styles.orderErrorMessage}>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === 'loading' && (
        <Spinner animation="border" role="status" className={styles.spinner}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group controlId="formEmail" className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter email"
          className={styles.formControl}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          className={styles.formControl}
        />
      </Form.Group>

      <Form.Group controlId="formPasswordRepeat" className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Repeat password</Form.Label>
        <Form.Control
          type="password"
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
          placeholder="Repeat password"
          className={styles.formControl}
        />
      </Form.Group>

      <button type="submit" className={styles.registerButton}>
        Submit
      </button>

    </Form>
  );
};

export default Register;