import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { selectIsLoggedIn } from "../redux/auth/selectors";

export default function PrivateRoute({ children, redirectPath = "/login" }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectPath} replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};
