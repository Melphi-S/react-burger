export const ADD_INGREDIENT = "ADD_INGREDIENT ";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addIngredient = (ingredient) => {
    return function(dispatch) {
        dispatch({
            type: ADD_INGREDIENT,
            payload: ingredient
        })
    }
}

export const deleteIngredient = (ingredient) => {
    return function(dispatch) {
        dispatch({
            type: DELETE_INGREDIENT,
            payload: ingredient
        })
    }
}

export const resetConstructor = (ingredient) => {
    return function(dispatch) {
        dispatch({
            type: RESET_CONSTRUCTOR,
        })
    }
}