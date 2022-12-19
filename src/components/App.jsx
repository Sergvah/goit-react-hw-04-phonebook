import { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import FilterSearch from './FilterSearch/FilterSearch';
import ContactsOfList from './ContactsOfList/ContactsOfList';
import { nanoid } from 'nanoid';

const LS_KEY = 'reader_contacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem(LS_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    // console.log(name);
    // console.log(number);

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const already = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    // console.log(already);
    if (!already) {
      setContacts(prevState => [contact, ...prevState]);
    } else {
      alert(`${contact.name}  is already in contacts.`);
      return;
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return visibleContacts;
  };

  const deleteCard = cardId => {
    setContacts(prevState => prevState.filter(card => card.id !== cardId));
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Contacts onSubmit={addContact} />
      <h2>Contacts</h2>
      <FilterSearch value={filter} onChange={changeFilter} />
      <ContactsOfList
        contacts={getVisibleContacts()}
        onDeleteCard={deleteCard}
      />
    </div>
  );
};

export default App;
