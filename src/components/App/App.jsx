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

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, forgotPasswordSuccess } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
    console.log(localStorage);
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
          redirectPathname="/profile"
        >
          <Login />
        </ProtectedRoute>
        <ProtectedRoute
          path="/register"
          condition={!userInfo}
          redirectPathname="/profile"
        >
          <Register />
        </ProtectedRoute>
        <ProtectedRoute
          path="/forgot-password"
          condition={!userInfo}
          redirectPathname="/profile"
        >
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute
          path="/reset-password"
          condition={!userInfo && forgotPasswordSuccess}
          redirectPathname="/profile"
        >
          <ResetPassword />
        </ProtectedRoute>
      </Switch>
    </>
  );
};

export default App;
