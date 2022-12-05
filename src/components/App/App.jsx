import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getUserInfo } from "../../services/actions/user";
import AppHeader from "../AppHeader/AppHeader";
import Main from "../../pages/Main/Main";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ForgotPassword from "../../pages/Forgot-password/Forgot-password";
import ResetPassword from "../../pages/Reset-password/Reset-password";
import Profile from "../../pages/Profile/Profile";
import NotFound from "../../pages/Not-found/Not-found";
import InfoBoard from "../InfoBoard/InfoBoard";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import Feed from "../../pages/Feed/Feed";
import Loader from "../Loader/Loader";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;

  const { userInfo, errorMessage } = useSelector((state) => state.user);

  const ingredients = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUserInfo());
  }, [dispatch]);

  const closeModal = () => {
    history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:number">
          <OrderDetails />
        </Route>
        <Route path="/ingredients/:id">
          {ingredients.length && (
            <IngredientDetails ingredients={ingredients} />
          )}
        </Route>
        <ProtectedRoute path="/profile" exact onlyForAuth>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact onlyForAuth>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:number" onlyForAuth>
          <OrderDetails />
        </ProtectedRoute>
        <ProtectedRoute path="/login" onlyForAuth={false}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path="/register" onlyForAuth={false}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute
          path="/forgot-password"
          condition={!userInfo}
          onlyForAuth={false}
        >
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" onlyForAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal closeModal={closeModal}>
            {ingredients.length && (
              <IngredientDetails ingredients={ingredients} />
            )}
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:number">
          <Modal closeModal={closeModal}>{<OrderDetails />}</Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:number">
          <Modal closeModal={closeModal}>{<OrderDetails />}</Modal>
        </Route>
      )}
      {errorMessage && <InfoBoard errorMessage={errorMessage} />}
      {!ingredients && <Loader text="Проверяем запасы" />}
    </>
  );
};

export default App;
