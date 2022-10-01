import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { currentIngredients } from '../../consts/consts';
import styles from './App.module.css';

class App extends React.Component {
  state = {
    ingredients: currentIngredients
  }

  render() {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
        <BurgerIngredients ingredients={this.state.ingredients}/>
        <BurgerConstructor ingredients={this.state.ingredients}/>
        </main>
      </>
    );
  }
}

export default App;
