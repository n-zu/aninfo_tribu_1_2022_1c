
import Modal from "../common/Modal/Modal";
import { Registro } from "../../services/types";
import RegistroForm from "./RegistroForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  registro?: Registro;
};

const RegistroModal = ({ open, onClose, onSave, registro }: Props) => {

  return(
    <Modal open={open} onClose={onClose}>
      <RegistroForm/>
    </Modal>);
};

export default RegistroModal;
