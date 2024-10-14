import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";
import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { selectError, selectLoading } from "./redux/contacts/selectors";
import { setFilter } from "./redux/filters/filterSlice";
import { refreshUser } from "./redux/auth/operations";
import { fetchContacts } from "./redux/contacts/operations";
import { selectIsRefreshUser, selectIsLoggedIn } from "./redux/auth/selectors";

const HomePage = lazy(() => import("./pages/HomePage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const isRefreshUser = useSelector(selectIsRefreshUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(setFilter(""));
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isRefreshUser && isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isRefreshUser, isLoggedIn]);

  if (isRefreshUser) {
    return <p>Refreshing...</p>;
  }

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectPath="/login">
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectPath="/contacts">
              <RegisterPage />
            </RestrictedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectPath="/contacts">
              <LoginPage />
            </RestrictedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;