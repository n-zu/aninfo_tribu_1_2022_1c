import { Registro } from "../../../services/types";
import Modal from "../../common/Modal/Modal";
import RegistroForm from "./RegistroForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  defaultValues?: any;
  registro?: Registro;
};

const RegistroModal = ({
  open,
  onClose,
  onSave,
  defaultValues,
  registro,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <RegistroForm
        onClose={onClose}
        onSave={onSave}
        defaultValues={defaultValues}
      />
    </Modal>
  );
};

export default RegistroModal;
