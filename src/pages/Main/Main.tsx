import { useSelector } from "../../types/store";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Loader from "../../components/Loader/Loader";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";
import styles from "./Main.module.scss";

const Main: FC = () => {
  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  return (
    <>
      {!!ingredientsRequest && <Loader text="Проверяем запасы" />}
      {!!ingredientsFailed && (
        <div>
          <p className="text text_type_main-large mt-30">
            Что-то пошло не так...
          </p>
          <p className="text text_type_main-large mt-15">
            Попробуйте обновить страницу или свяжитесь с нами по телефону
          </p>
          <p className="text text_type_main-large mt-15">322-22-32-22</p>
        </div>
      )}
      {!ingredientsRequest && !ingredientsFailed ? (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      ) : null}
    </>
  );
};

export default Main;
