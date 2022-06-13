import { ReactNode } from "react";
import { Container, Modal as MuiModal, Paper } from "@material-ui/core";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <MuiModal open={open} onClose={onClose} className={styles.Modal}>
      <Container className={styles.Container}>
        <Paper className={styles.Paper}>{children}</Paper>
      </Container>
    </MuiModal>
  );
};

export default Modal;
