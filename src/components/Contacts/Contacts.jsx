import { useState } from 'react';
// import { nanoid } from 'nanoid';
import css from 'components/Contacts/contacts.module.css';
import PropTypes from 'prop-types';

const Contacts = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // const inputId = nanoid();

  const handleNameChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (onSubmit({ name, number }) !== 1) {
      reset();
    }
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="name"> </label>
      Name
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
        id="name"
      />
      <label htmlFor="number">Number </label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNameChange}
        id="number"
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

Contacts.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Contacts;
