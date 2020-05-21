import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./App.module.css";
import { v1 as uuidv1 } from "uuid";
import FormToAddContact from "../FormToAddContact/FormToAddContact";
import ContactList from "../ContactList/ContactList";
import FilterContacts from "../FilterContacts/FilterContacts";

const filterContacts = (contacts, filter) => {
  return contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.toLowerCase().includes(filter.toLowerCase())
  );
};

export default class App extends Component {
  static defaultProps = {
    initialContactsArray: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      { id: "id-5", name: "Cavin Clein", number: "111-12-56" },
      { id: "id-6", name: "Cris Dior", number: "222-89-12" },
      { id: "id-7", name: "Gus Gussi", number: "333-17-79" },
      { id: "id-8", name: "Va Voronin", number: "444-91-26" },
    ],
    initialFilterValue: "",
    inputCallState: false,
  };

  static propTypes = {
    initialContactsArray: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    initialFilterValue: PropTypes.string,
    inputCallState: PropTypes.bool,
  };

  state = {
    contacts: this.props.initialContactsArray,
    filter: this.props.initialFilterValue,
    inputCallState: this.props.inputCallState,
  };

  componentDidMount() {
    const savedLocalyContacts = JSON.parse(localStorage.getItem("contacts"));
    if (savedLocalyContacts)
      this.setState({
        contacts: savedLocalyContacts,
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (contact) => {
    const { contacts } = this.state;
    const findName = contacts.find((ct) => ct.name === contact.name);
    const findNumber = contacts.find((ct) => ct.number === contact.number);

    if (findName) {
      alert(
        `Contact whith name ${contact.name} has been already saved in your phonebook!!!`
      );
    } else if (findNumber) {
      alert(`The number ${contact.number} has been already saved !!! `);
    } else {
      const contactToAdd = {
        ...contact,
        id: uuidv1(),
      };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contactToAdd],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  setFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  showHideForm = (e) =>
    this.setState((prevState) => ({
      inputCallState: !prevState.inputCallState,
    }));

  render() {
    const { contacts, filter, inputCallState } = this.state;
    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.appWraper}>
        <h1 className={styles.appTitle}>Phonebook</h1>
        <button className={styles.addFormButton} onClick={this.showHideForm}>
          {inputCallState ? "Hide form" : "Add contact"}
        </button>
        {inputCallState && (
          <FormToAddContact
            onAddContact={this.addContact}
            onCloseForm={this.showHideForm}
          />
        )}
        {contacts.length > 0 && <h2>Contacts</h2>}
        {contacts.length > 1 && (
          <FilterContacts
            contacts={contacts}
            value={filter}
            onSetFilter={this.setFilter}
          />
        )}
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
