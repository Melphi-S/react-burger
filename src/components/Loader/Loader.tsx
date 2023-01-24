import styles from "./Loader.module.scss";
import { FC } from "react";

type TLoaderProps = {
  text?: string;
};

const Loader: FC<TLoaderProps> = ({ text = "Загрузка" }) => {
  return (
    <div className={styles.ring}>
      {text}
      <span className={styles.dot}></span>
    </div>
  );
};

export default Loader;
