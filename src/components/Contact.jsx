import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.css';

const Contact = ({ name, number, onDelete }) => {
  return (
    <li className={styles.contactCard}>
      <div className={styles.contactDetails}>
        <span className={styles.contactName}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} /> {name}
        </span>
        <span className={styles.contactNumber}>
          <FontAwesomeIcon icon={faPhone} className={styles.icon} /> {number}
        </span>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={onDelete}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;

