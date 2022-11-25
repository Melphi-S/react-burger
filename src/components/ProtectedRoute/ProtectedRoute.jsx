import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
