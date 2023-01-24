import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useSelector } from "../../types/store";
import { FC } from "react";

type TProtectedRouteProps = {
  onlyForAuth: boolean;
} & RouteProps;

const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyForAuth,
  children,
  ...rest
}) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useLocation<{ from: { pathname: string } }>();

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

export default ProtectedRoute;
