import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./FormToAddContact.module.css";

export default class FormToAddContact extends Component {
  static defaultProps = {
    initialValue: "",
  };

  static propTypes = {
    initialValue: PropTypes.string,
  };

  state = {
    name: this.props.initialValue,
    number: this.props.initialValue,
  };

  handleInput = (e) => this.setState({ [e.target.name]: e.target.value });

  resetState = () =>
    this.setState({
      name: "",
      number: "",
    });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddContact({ ...this.state });
    this.resetState();
  };

  handleCloseForm = (e) => {
    this.props.onCloseForm();
  };

  render() {
    const { name, number } = this.state;
    return (
      <section className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button
            className={styles["material-icons"]}
            onClick={this.handleCloseForm}
          >
            clear
          </button>

          <label className={styles.inputLabel}>Name</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            value={name}
            onChange={this.handleInput}
            required
          />
          <label className={styles.inputLabel}>Number</label>
          <input
            className={styles.input}
            name="number"
            type="tel"
            value={number}
            placeholder="+38(XX)-XXX-XX-XX"
            onChange={this.handleInput}
            required
          />
          <br />
          <button className={styles.submitButton} type="submit">
            Add contact
          </button>
        </form>
      </section>
    );
  }
}
