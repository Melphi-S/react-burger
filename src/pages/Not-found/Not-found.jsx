import { useCallback } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import styles from "./Not-found.module.scss";

const NotFound = () => {
  const history = useHistory();

  const goHome = useCallback(
    () => history.replace({ pathname: "/" }),
    [history]
  );

  return (
    <>
      <div className={styles.container}>
        <span className={styles.errorNumber}>4</span>
        <img src={require("../../images/space-ship.gif")} alt="Космический корабль." />
        <span className={styles.errorNumber}>4</span>
      </div>
      <p className="text text_type_main-medium mb-15">
        Упс, кажется, Вы забрели не туда... Поскорее возвращайтесь домой.
      </p>
      <Button htmlType="button" type="primary" size="large" onClick={goHome}>
        Вернуться домой
      </Button>
    </>
  );
};
export default NotFound;
