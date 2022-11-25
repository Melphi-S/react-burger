import { useEffect } from "react";
import { useDispatch } from "react-redux";
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

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
    console.log(localStorage);
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <ProtectedRoute path='/profile'>
          <Profile/>
        </ProtectedRoute>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPassword />
        </Route>
        <Route path='/reset-password'>
          <ResetPassword />
        </Route>
      </Switch>
    </>
  );
};

export default App;
