import { useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "./App.module.css";

const App = () => {
  const dispatch = useDispatch();

  const { ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.ingredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {ingredientsRequest ? (
        <div className={styles.spinner}></div>
      ) : ingredientsFailed ? (
        <div>
          <h1 className="text text_type_main-large mt-30">
            Что-то пошло не так...
          </h1>
          <h1 className="text text_type_main-large mt-15">
            Попробуйте обновить страницу или свяжитесь с нами по телефону
          </h1>
          <h1 className="text text_type_main-large mt-15">322-22-32-22</h1>
        </div>
      ) : (
        <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </>
  );
};

export default App;
