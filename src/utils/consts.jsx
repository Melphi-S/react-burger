import PropTypes from "prop-types";

const ingredientTypes = {
  bun: "bun",
  sauce: "sauce",
  main: "main",
};

const ingredient = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const selectedIngredientIds = {
  bunId: "60d3b41abdacab0026a733c6",
  toppingIds: [
    "60d3b41abdacab0026a733c8",
    "60d3b41abdacab0026a733cc",
    "60d3b41abdacab0026a733d0",
    "60d3b41abdacab0026a733d1",
    "60d3b41abdacab0026a733d4",
    "60d3b41abdacab0026a733d4",
  ],
};

const URL = "https://norma.nomoreparties.space/api";

export {
  ingredientTypes,
  ingredient,
  URL,
  selectedIngredientIds
};
