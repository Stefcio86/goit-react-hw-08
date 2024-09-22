import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../slices/contactsSlice';
import Contact from './Contact';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  const dispatch = useDispatch();
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDelete={() => dispatch(deleteContact(contact.id))} 
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;