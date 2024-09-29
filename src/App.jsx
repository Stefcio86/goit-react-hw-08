import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBox from './components/SearchBox';
import { fetchContacts } from './slices/contactsSlice';
import { setFilter } from './slices/filtersSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);

  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox value={filter} onChange={event => dispatch(setFilter(event.target.value))} />
      <ContactList contacts={filteredContacts} />
    </div>
  );
};

export default App;
