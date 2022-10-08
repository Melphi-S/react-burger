import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.scss";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4 pr-4 pl-4`}>
      <div className={`${styles.header__container}`}>
        <ul className={styles.header__nav}>
          <li className="mr-5 pr-4">
            <a href="#" className={styles.header__link}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li className="pl-4 pr-4">
            <a href="#" className={styles.header__link}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive ml-2">
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
        <Logo />
        <a href="#" className={styles.header__link}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">
            Личный кабинет
          </p>
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
