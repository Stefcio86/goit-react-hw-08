import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser, resetError } from '../slices/authSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success('Rejestracja powiodła się!');
    } catch (error) {
      toast.error('Rejestracja nie powiodła się! Sprawdź swoje dane.');
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
    <div>
      <h1>Register</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p>{error}</p>}
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterPage;
