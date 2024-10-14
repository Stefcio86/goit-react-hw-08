import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import styles from "./ContactForm.module.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../redux/contacts/selectors";
import { addContact } from "../redux/contacts/operations";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short")
    .max(50, "Name is too long")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{9}$/, "Number must be exactly 9 digits")
    .required("Required"),
});

const formatNumber = (number) => {
  return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
};

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const formattedNumber = formatNumber(values.number);
    const contactExists = (contacts || []).some(
      (contact) =>
        contact.name === values.name ||
        contact.number === formattedNumber ||
        contact.number === values.number
    );

    if (contactExists) {
      alert("This contact already exists!");
      return;
    }

    dispatch(addContact({ name: values.name, number: formattedNumber }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={nameFieldId} className={styles.label}>Name</label>
            <Field type="text" name="name" id={nameFieldId} className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={numberFieldId} className={styles.label}>Number</label>
            <Field
              type="text"
              name="number"
              id={numberFieldId}
              maxLength={10}
              className={styles.input}
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Add contact</button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;