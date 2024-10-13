import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import SearchBox from '../components/SearchBox';
import { fetchContacts } from '../slices/contactsSlice';
import { logout } from '../slices/authSlice';  
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);
  const loading = useSelector(state => state.contacts.loading);
  const error = useSelector(state => state.contacts.error);

  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <h1>Kontakty</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>Wyloguj się</button>
      <ContactForm />
      <SearchBox />
      {loading && <p>Ładowanie kontaktów...</p>}
      {error && <p>Błąd podczas pobierania kontaktów: {error}</p>}
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default ContactsPage;
