import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from '../slices/contactsSlice';
import styles from './ContactForm.module.css';
import { useState } from 'react'; // Import useState

const ContactForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Stan ładowania
  const [successMessage, setSuccessMessage] = useState(''); // Stan wiadomości o sukcesie

  const initialValues = {
    name: '',
    phone: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces')
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
    phone: Yup.string()
      .matches(/^\d+$/, 'Phone can only contain digits')
      .min(3, 'Must be at least 3 characters')
      .max(50, 'Must be 50 characters or less')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    setIsLoading(true); // Ustaw stan ładowania
    const newContact = {
      id: nanoid(),
      name: values.name,
      phone: values.phone,
    };

    dispatch(addContact(newContact)).then(() => {
      setIsLoading(false); // Wyłącz stan ładowania
      setSuccessMessage('Contact added successfully!'); // Ustaw wiadomość o sukcesie
      resetForm();
      setTimeout(() => setSuccessMessage(''), 3000); // Ukryj wiadomość po 3 sekundach
    }).catch(() => {
      setIsLoading(false); // Wyłącz stan ładowania w przypadku błędu
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" type="text" autoComplete="off" />
        <ErrorMessage name="name" component="div" className={styles.error} />

        <label htmlFor="phone">Phone</label>
        <Field id="phone" name="phone" type="tel" autoComplete="off" />
        <ErrorMessage name="phone" component="div" className={styles.error} />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Contact'}
        </button>

        {successMessage && <p className={styles.success}>{successMessage}</p>} {/* Komunikat o sukcesie */}
      </Form>
    </Formik>
  );
};

export default ContactForm;
