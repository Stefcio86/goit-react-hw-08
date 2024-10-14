import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './EditContactModal.module.css';

const EditContactModal = ({ isOpen, contact, onClose, onSave }) => {
  const [name, setName] = useState(contact?.name || '');
  const [number, setNumber] = useState(contact?.number || '');

  const handleSave = () => {
    onSave({ ...contact, name, number });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <h2 className={styles.header}>Edit Contact</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input
            id="name"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="number">Number</label>
          <input
            id="number"
            className={styles.input}
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.saveButton} onClick={handleSave}>Save</button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

EditContactModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditContactModal;
