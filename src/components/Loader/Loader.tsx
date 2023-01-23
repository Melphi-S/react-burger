import styles from "./Loader.module.scss";
import { FC } from "react";

type TLoaderProps = {
  text?: string;
};

const Loader: FC<TLoaderProps> = ({ text }) => {
  return (
    <div className={styles.ring}>
      {text}
      <span className={styles.dot}></span>
    </div>
  );
};

Loader.defaultProps = { text: "Загрузка" };

export default Loader;
