import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register as registerUser } from '../redux/auth/operations';
import { resetError } from '../redux/auth/authslice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import DocumentTitle from '../components/DokumentTitle';
import Loader from '../components/Loader';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success('Register succes');
    } catch (err) {
      toast.error(`Error during register: ${err}`);
    }
  };

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(resetError());
      }
    };
  }, [dispatch, error]);

  return (
    <>
      <DocumentTitle>Register</DocumentTitle>
      <div className={styles.container}>
        <h1>Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className={styles.error} />
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className={styles.error} />
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className={styles.error} />
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? <Loader /> : 'Register'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default RegisterPage;
