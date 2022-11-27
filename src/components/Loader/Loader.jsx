import styles from "./Loader.module.scss";

const Loader = ({text}) => {
  return (
    <div className={styles.ring}>
      {text}
      <span className={styles.dot}></span>
    </div>
  );
};

Loader.defaultProps = {text: 'Загрузка'}

export default Loader;
