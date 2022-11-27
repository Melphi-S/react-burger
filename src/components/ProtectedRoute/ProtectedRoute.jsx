import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ condition, redirectPathname, children, ...rest }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

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
