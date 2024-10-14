import PropTypes from 'prop-types';
import Contact from './Contact';
import Loader from './Loader';
import EditContactModal from './EditContactModal'; 
import DeleteConfirmationModal from './DeleteConfirmationModal'; 
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { deleteContact, editContact } from '../redux/contacts/operations'; 
import styles from './ContactList.module.css';

const ContactList = ({ contacts, isLoading, error }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEdit = (id, name, number) => {
    setSelectedContact({ id, name, number });
    setIsEditModalOpen(true);
  };

  const handleDeleteRequest = (id, name, number) => {
    setSelectedContact({ id, name, number });
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteContact(selectedContact.id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to delete contact: ${error}`);
      });
    setIsDeleteModalOpen(false);
  };

  const handleSave = (updatedContact) => {
    dispatch(editContact(updatedContact))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to update contact: ${error}`);
      });
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Failed to load contacts: {error}</p>;
  }

  if (contacts.length === 0) {
    return <p>No contacts available.</p>;
  }

  return (
    <>
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number} 
            onEdit={handleEdit} 
            onDelete={handleDeleteRequest}
          />
        ))}
      </ul>
      {isEditModalOpen && selectedContact && (
        <EditContactModal
          contact={selectedContact}
          isOpen={isEditModalOpen}  
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
      {isDeleteModalOpen && selectedContact && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
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
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default ContactList;
