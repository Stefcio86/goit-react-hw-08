 

import { Link } from "react-router-dom";
import styles from "./AuthNav.module.css"; 

export default function AuthNav() {
  return (
    <nav className={styles.authNav}>
      <Link to="/register" className={styles.link}>Register</Link>
      <Link to="/login" className={styles.link}>Login</Link>
    </nav>
  );
}
