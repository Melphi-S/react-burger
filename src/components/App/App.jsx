import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { currentApi } from "../../utils/Api";
import { selectedIngredientIds } from "../../utils/consts";
import styles from "./App.module.css";

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const getIngredientsFromApi = () => {
    currentApi.getIngredients().then((res) => {
      setIngredients(res.data);
    });
  };

  useEffect(() => {
    getIngredientsFromApi();
  }, []);

  return (
    <>
      <AppHeader />
      {ingredients.length && (
        <main className={styles.main}>
          <BurgerIngredients
            ingredients={ingredients}
            selectedIngredientIds={selectedIngredientIds}
          />
          <BurgerConstructor
            ingredients={ingredients}
            selectedIngredientIds={selectedIngredientIds}
          />
        </main>
      )}
    </>
  );
};

export default App;
