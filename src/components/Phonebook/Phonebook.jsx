import { Component } from 'react';
import styles from '../Phonebook/phonebook.module.scss';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class Phonebook extends Component {

  state = {
    contacts: [
      {id: nanoid(), name: 'Rosie Simpson', number: '459-12-56'},
      {id: nanoid(), name: 'Hermione Kline', number: '443-89-12'},
      {id: nanoid(), name: 'Eden Clements', number: '645-17-79'},
      {id: nanoid(), name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  addContact = (evt) => {
    evt.preventDefault();
    
    this.setState(prevState => {
      const {name, number, contacts} = prevState;

      if (this.checkDuplicate(name)) {
        return alert(`${name} is already in contacts`)
      }

      const newContact = {
        id: nanoid(),
        name, number
      }

      return {contacts: [newContact, ...contacts], name: '', number: ''}
    })
  }

  checkDuplicate (name) {}

  removeContact (id) {
    this.setState(({contacts}) => {
      const newContact = contacts.filter(item => item.id !== id);

      return {contacts: newContact}
    })
  }

  

  handleChange = ({target}) => {
    const {name, value} = target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const {addContact, handleChange} = this;

    const {contacts , name, number} = this.state;

    const contact = contacts.map(({id, name, number}) =><div className={styles.blockItem}>
      <li key={id}>{name} {number}</li>
      <button onClick={() => this.removeContact(id)} type="button" className={styles.btnDelete}>Delete</button>
    </div> )
    
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Phonebook</h1>

        <div className={styles.block}>
          <form onSubmit={addContact}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input
                onChange={handleChange}
                value={name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
              <label>Number</label>
              <input
                onChange={handleChange}
                value={number}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
              <button type="submit" className={styles.btn}>Add contacts</button>
            </div>
          </form>
        </div>

        <h2 className={styles.title}>Contacts</h2>
        <div className={styles.block}>
        <label>Find contacts by name</label>
        <input type="text" />
        </div>
        <ul className={styles.list}>
          {contact}
        </ul>
      </div>
    );
  }
}

export default Phonebook;
