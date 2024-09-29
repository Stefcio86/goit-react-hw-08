import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../slices/contactsSlice';
import styles from './Contact.module.css';

const Contact = ({ id, name, phone }) => {  
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  
  return (
    <li className={styles.contactCard}>
      <div className={styles.contactDetails}>
        <span className={styles.contactName}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} /> {name}
        </span>
        <span className={styles.contactNumber}>
          <FontAwesomeIcon icon={faPhone} className={styles.icon} /> {phone}  {/* Zmień `number` na `phone` */}
        </span>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete} 
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired, 
};

export default Contact;
