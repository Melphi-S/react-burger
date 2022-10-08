import styles from "./ModalOverlay.module.scss";

const ModalOverlay = ({ onClick }) => {

    return (
      <div className={styles.overlay} onClick={onClick} />
    );
  };

export default ModalOverlay;