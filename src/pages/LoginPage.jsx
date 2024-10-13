import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../slices/authSlice';
import styles from './LoginPage.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Nieprawidłowy email').required('Email jest wymagany'),
  password: Yup.string().min(6, 'Hasło musi mieć co najmniej 6 znaków').required('Hasło jest wymagane'),
});

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <div className={styles.container}>
      <h1>Logowanie</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label htmlFor="email">Email</label>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label htmlFor="password">Hasło</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className={styles.error} />

          <button type="submit" className={styles.submitButton}>Zaloguj się</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
