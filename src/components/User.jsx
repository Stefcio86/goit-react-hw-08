import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/auth/operations";
import { selectUser } from "../redux/auth/selectors";
import styles from "./UserNav.module.css";

export default function UserNav() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.userNav}>
      {userName ? (
        <>
          <span>
            Welcome, <b>{userName.name}</b>!
          </span>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </>
      ) : (
        <span>Loading user...</span>
      )}
    </div>
  );
}
