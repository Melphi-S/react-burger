import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { ingredientInfoReducer } from './ingredientInfo';
import { orderReducer } from './order';
import { userReducer } from './user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    ingredientInfo: ingredientInfoReducer,
    order: orderReducer,
    user: userReducer
})