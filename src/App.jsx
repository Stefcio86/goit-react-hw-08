import { useDispatch, useSelector } from 'react-redux';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import SearchBox from './components/SearchBox';
import { addContact, deleteContact } from './slices/contactsSlice';
import { setFilter } from './slices/filtersSlice';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filters.name);

 const handleAddContact = newContact => {
  dispatch(addContact(newContact));
 };

 const handleDeleteContact = contactId => {
  dispatch(deleteContact(contactId));
 };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
};

export default App;