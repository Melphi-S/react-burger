import { useState, useEffect, useReducer } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { currentApi } from "../../utils/Api";
import { ingredientTypes } from "../../utils/consts";
import IngredientsContext from "../../context/ingredientsContext";
import ConstructorContext from "../../context/constructorContext";
import styles from "./App.module.css";

const emptyConstructor = { bunId: null, toppingIds: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return action.ingredient.type === ingredientTypes.bun
        ? { ...state, bunId: action.ingredient._id }
        : {
            ...state,
            toppingIds: [...state.toppingIds, action.ingredient._id],
          };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
};

const App = () => {
  const [ingredients, setIngredients] = useState([]);

  const [constructorState, constructorDispatcher] = useReducer(
    reducer,
    emptyConstructor,
    undefined
  );

  const getIngredientsFromApi = () => {
    currentApi
      .getIngredients()
      .then((res) => {
        setIngredients(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getIngredientsFromApi();
  }, []);

  return (
    <>
      <AppHeader />
      {ingredients.length && (
        <main className={styles.main}>
          <IngredientsContext.Provider value={ingredients}>
            <ConstructorContext.Provider
              value={{ constructorState, constructorDispatcher }}
            >
              <BurgerIngredients />
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
        </main>
      )}
    </>
  );
};

export default App;
