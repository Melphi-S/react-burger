import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <header className={`${styles.header} pt-4 pb-4 pr-4 pl-4`}>
      <div className={`${styles.header__container}`}>
        <ul className={styles.header__nav}>
          <li className="mr-5 pr-4">
            <NavLink
              to="/"
              exact
              className={styles.header__link}
              activeClassName={styles.header__link_active}
            >
              <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </NavLink>
          </li>
          <li className="pl-4 pr-4">
            <a href="#" className={styles.header__link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </a>
          </li>
        </ul>
        <Logo />
        <NavLink
          to="/profile"
          className={styles.header__link}
          activeClassName={styles.header__link_active}
        >
          <ProfileIcon type={pathname.startsWith('/profile') ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
