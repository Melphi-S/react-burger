import styles from "./ModalOverlay.module.scss";
import { FC } from "react";

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
