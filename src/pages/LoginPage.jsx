// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DocumentTitle from '../components/DokumentTitle';
import { logIn } from '../redux/auth/operations'
import Loader from '../components/Loader';
import { resetError } from '../redux/auth/authslice';
import styles from './LoginPage.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  password: Yup.string().min(6, 'Hasło musi mieć co najmniej 6 znaków').required('Hasło jest wymagane'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(logIn(values)).unwrap();
      resetForm();
    } catch {
      // Error Login profile
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetError()); 
    };
  }, [dispatch]);

  return (
    <>
      <DocumentTitle>Login</DocumentTitle>
      <div className={styles.container}>
        <h1>Login</h1>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className={styles.error} />
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? <Loader /> : 'Zaloguj się'}
            </button>
            {error && <div className={styles.error}>Loading error: {error}</div>}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
