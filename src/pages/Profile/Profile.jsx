import { Switch, Route } from "react-router-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../services/actions/user";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Profile.module.scss";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import ProfileOrders from "../../components/ProfileOrders/ProfileOrders";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const { pathname } = useLocation();

  const profileCaption = () => {
    switch (pathname) {
      case "/profile":
        return "В этом разделе вы можете изменить свои персональные данные";
      case "/profile/orders":
        return "В этом разделе вы можете просмотреть свою историю заказов";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  return isAuthChecked ? (
    <main className={styles.profile}>
      <ul className={styles.profile__nav}>
        <li>
          <NavLink
            to="/profile"
            exact
            className={`${styles.profile__link} text text_type_main-medium`}
            activeClassName={`${styles.profile__link_active} text text_type_main-medium`}
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/orders"
            exact
            className={`${styles.profile__link} text text_type_main-medium`}
            activeClassName={`${styles.profile__link_active} text text_type_main-medium`}
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <Button
            htmlType="button"
            type="secondary"
            onClick={handleLogout}
            extraClass={`${styles.profile__link} text text_type_main-medium`}
          >
            Выход
          </Button>
        </li>
      </ul>
      <p
        className={`${styles.profile__caption} text text_type_main-default text_color_inactive`}
      >
        {profileCaption()}
      </p>
      <Switch>
        <Route path="/profile" exact>
          <ProfileForm />
        </Route>
        <Route path="/profile/orders" exact>
          <ProfileOrders />
        </Route>
      </Switch>
    </main>
  ) : (
    <Loader />
  );
};

export default Profile;
