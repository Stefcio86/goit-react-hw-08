import React from 'react';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to the Contacts App!</h1>
      <p className={styles.description}>
        Manage your contacts easily and efficiently. Use the navigation above to register, log in, and view your contacts.
      </p>
    </div>
  );
};

export default HomePage;
