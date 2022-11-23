import { useEffect } from "react";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./Main.module.scss";

const Main = () => {
  const dispatch = useDispatch();

  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {!!ingredientsRequest && <div className={styles.spinner}></div>}
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
      {!ingredientsRequest & !ingredientsFailed ? (
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
