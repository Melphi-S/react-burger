import { useRef, FC } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useSelector, useDispatch } from "../../types/store";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./Topping.module.scss";
import { sortConstructor } from "../../services/actions/constructor";
import { TConstuctorElement } from "../../types/constructor";
import { Identifier } from "typescript";

type TToppingProps = {
  index: number;
  handleClose: () => void;
  ingredient: TConstuctorElement;
};

type IDropItem = {
  id: string;
  index: number;
}

const Topping: FC<TToppingProps> = ({ index, handleClose, ingredient }) => {
  const { selectedToppings } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const id = ingredient.id;
  const [{ handlerId }, drop] = useDrop<
    IDropItem,
    unknown,
    { item: IDropItem; handlerId: string | symbol | null }
  >({
    accept: "burgerConstructor",
    collect(monitor) {
      return {
        item: monitor.getItem(),
        handlerId: monitor.getHandlerId(),
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

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

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
  const [{ isDragging }, drag] = useDrag({
    type: "burgerConstructor",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

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
