import React from "react";
import PropTypes from "prop-types";
import styles from "./Contact.module.css";

const Contact = ({ name, number, onDeleteContact }) => (
  <section className={styles.contactCard}>
    <button className={styles["material-icons"]} onClick={onDeleteContact}>
      clear
    </button>
    <img
      className={styles.contactImage}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6wCWBCj96njmRi23H8e5ueLNSF0ykh6aGI8ETI8x5vCrLziFi&usqp=CAU"
      alt="contact-avatar"
    />
    <p>{name}</p>
    <p>{number}</p>
  </section>
);

export default Contact;

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
