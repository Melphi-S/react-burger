import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { orderReducer } from './order';
import { userReducer } from './user';
import { wsOrdersReducer } from './wsOrders';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
    wsOrders: wsOrdersReducer
})