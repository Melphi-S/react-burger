import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ condition, redirectPathname, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        condition ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectPathname,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  condition: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  redirectPathname: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
