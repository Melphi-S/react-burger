import { createPortal } from "react-dom";
import { useMemo, useEffect, useRef, FC } from "react";
import { useDispatch } from "react-redux";
import { hideInfoBoard } from "../../services/actions/user";
import { infoMessages, defaultMessage } from "../../utils/consts";
import PropTypes from "prop-types";
import styles from "./InfoBoard.module.scss";

const infoBoardElement = document.querySelector("#infoBoard") as HTMLElement;

type TInfoBoardProps = {
  errorMessage: string;
};

const InfoBoard: FC<TInfoBoardProps> = ({ errorMessage }) => {
  const dispatch = useDispatch();
  const boardRef = useRef<HTMLDivElement>(null);

  const infoMessage = useMemo(() => {
    return (
      infoMessages.find((message) => message.payloadMessage === errorMessage)
        ?.boardMessage || defaultMessage
    );
  }, [errorMessage]);

  const moveUp = () => {
    const board = boardRef.current;
    board && board.classList.add(styles.infoBoard_disabled);
  };

  useEffect(() => {
    const upTimer = setTimeout(() => moveUp(), 4000);
    const hideTimer = setTimeout(() => dispatch(hideInfoBoard()), 5000);
    return () => {
      clearTimeout(upTimer);
      clearTimeout(hideTimer);
    };
  }, [dispatch]);

  return createPortal(
    <div className={styles.infoBoard} ref={boardRef}>
      <p className="text text_type_main-default mt-2 mb-2 mr-2 ml-2">
        {infoMessage}
      </p>
    </div>,

    infoBoardElement
  );
};

InfoBoard.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default InfoBoard;
