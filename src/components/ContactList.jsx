import PropTypes from 'prop-types';
import Contact from './Contact';
import styles from './ContactList.module.css';

const ContactList = ({ contacts }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}  
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
      phone: PropTypes.string.isRequired,  
    })
  ).isRequired,
};

export default ContactList;
