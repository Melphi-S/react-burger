import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import styles from "./Modal.module.scss";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    const handleEscKeydown = (event) => {
      event.key === "Escape" && closeModal();
    };

    document.addEventListener("keydown", handleEscKeydown);

    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, [closeModal]);

  return createPortal(
    <>
      <div className={styles.modal}>
        {children}
        <button
          type="button"
          onClick={closeModal}
          className={styles.modal__closeButton}
        >
          <CloseIcon type="primary" />
        </button>
      </div>
      <ModalOverlay onClick={closeModal} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;
