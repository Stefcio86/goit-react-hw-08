import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './Contact.module.css';

const Contact = ({ id, name, number, onEdit, onDelete }) => {
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
      <div className={styles.actionButtons}>
        <button
          type="button"
          className={styles.editButton}
          onClick={() => onEdit(id, name, number)}
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onDelete(id, name, number)}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete
        </button>
      </div>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired, 
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Contact;
