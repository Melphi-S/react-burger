import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUserInfo } from "../../services/actions/user";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../../pages/Main/Main";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/Forgot-password/Forgot-password";
import ResetPassword from "../../pages/Reset-password/Reset-password";
import Profile from "../../pages/Profile/Profile";
import NotFound from "../../pages/Not-found/Not-found";

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, forgotPasswordSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <ProtectedRoute
          path="/profile"
          condition={userInfo}
          redirectPathname="/login"
        >
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute
          path="/login"
          condition={!userInfo}
          redirectPathname="/"
        >
          <Login />
        </ProtectedRoute>
        <ProtectedRoute
          path="/register"
          condition={!userInfo}
          redirectPathname="/"
        >
          <Register />
        </ProtectedRoute>
        <ProtectedRoute
          path="/forgot-password"
          condition={!userInfo}
          redirectPathname="/"
        >
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reset-password"
          condition={!userInfo && forgotPasswordSuccess}
          redirectPathname="/forgot-password"
        >
          <ResetPassword />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
};

export default App;
