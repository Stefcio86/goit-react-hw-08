import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/selectors";
import UserNav from "./User";
import AuthNav from "./Auth";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.navLink}>Home</Link>
      {isLoggedIn && <Link to="/contacts" className={styles.navLink}>Contacts</Link>}
      <div className={styles.userSection}>
        {isLoggedIn ? <UserNav /> : <AuthNav />}
      </div>
    </nav>
  );
}
