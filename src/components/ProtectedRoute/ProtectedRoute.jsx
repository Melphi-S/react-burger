import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ onlyForAuth, children, ...rest }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useLocation();

  if (!onlyForAuth && userInfo) {
    const { from } = location.state || { from: { pathname: "/" } };
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }

  if (onlyForAuth && !userInfo) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};

ProtectedRoute.propTypes = {
  onlyForAuth: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
