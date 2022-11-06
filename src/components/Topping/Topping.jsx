import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Topping.module.scss";
import { sortConstructor } from "../../services/actions/constructor";

const Topping = ({ index, handleClose, ingredient }) => {
  const { selectedToppings } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = ingredient.id;
  const [{ handlerId, dragedIngredient }, drop] = useDrop({
    accept: "burgerConstructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        dragedIngredient: monitor.getItem(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(sortConstructor(selectedToppings, dragIndex, hoverIndex));

      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: "burgerConstructor",
    item: () => {
      return { id, index };
    },
  });
  drag(drop(ref));

  const opacity = !dragedIngredient ? 1 : dragedIngredient.id === id ? 0.5 : 1;

  return (
    <li
      className={styles.topping}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.info.name}
        price={ingredient.info.price}
        thumbnail={ingredient.info.image}
        handleClose={handleClose}
      />
    </li>
  );
};

export default Topping;
