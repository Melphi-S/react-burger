import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from "./Modal.module.scss";

const modalsContainer = document.querySelector('#modals');

const Modal = ({ title, onOverlayClick, onEscKeydown, children }) => {

  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);

  // Рендерим модалку в соответствующий DOM-элемент
  return createPortal(
    (<>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>),
    modalsContainer
  );
};

export default Modal;