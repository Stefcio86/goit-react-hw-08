import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Fuse from 'fuse.js'; 
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader';
import DocumentTitle from '../components/DokumentTitle';
import { fetchContacts } from '../redux/contacts/operations';
import { selectContacts, selectLoading, selectError } from '../redux/contacts/selectors';
import { selectFilter } from '../redux/filters/selectors';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      dispatch(fetchContacts());
    }
  }, [dispatch]);

  
  const fuse = new Fuse(contacts, {
    keys: ['name', 'number'],
    threshold: 0.3, 
  });

  
  const filteredContacts = filter
    ? fuse.search(filter).map(result => result.item)
    : contacts;

  return (
    <>
      <DocumentTitle>Contacts</DocumentTitle>
      <div className={styles.container}>
        <h1>Contacts</h1>
        <ContactForm />
        <SearchBox value={filter} />
        {isLoading ? (
          <Loader />
        ) : (
          <ContactList contacts={filteredContacts} isLoading={isLoading} error={error} />
        )}
        {error && <p className={styles.error}>Error downloading contacts: {error}</p>}
      </div>
    </>
  );
};

export default ContactsPage;
