import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DocumentTitle from '../components/DokumentTitle';
import styles from './HomePage.module.css';

const HomePage = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>
      <div className={styles.homeContainer}>
        <h1 className={styles.title}>Welcome to the Contacts App!</h1>
        <p className={styles.description}>
          Manage your contacts easily and efficiently. Use the navigation above to register, log in, and view your contacts.
        </p>
        {!isLoggedIn ? (
          <div className={styles.buttonContainer}>
            <Link to="/register" className={styles.button}>Register</Link>
            <Link to="/login" className={styles.button}>Login</Link>
          </div>
        ) : (
          <Link to="/contacts" className={styles.button}>Go to Contacts</Link>
        )}
      </div>
    </>
  );
};

export default HomePage;
