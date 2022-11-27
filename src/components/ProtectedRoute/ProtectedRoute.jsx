import { Route, Redirect } from "react-router-dom";

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

export default ProtectedRoute;
