import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Aplikacja Kontakty</h1>
      <nav>
        <Link to="/register">Rejestracja</Link>
        <Link to="/login">Logowanie</Link>
        <Link to="/contacts">Kontakty</Link>
      </nav>
    </header>
  );
};

export default Header;
