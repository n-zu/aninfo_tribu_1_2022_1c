import Modal from "../common/Modal/Modal";
import { Formik, Form } from "formik";
import FormField from "../common/Form/FormField";
import { Button } from "@material-ui/core";
import { createProject } from "../../services/projects";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  onClose: () => void;
};

const NewProjectModal = ({ open, onClose }: Props) => {
  const [creating, setCreating] = useState(false);

  const initialValues = {
    name: "",
    initial_date: "",
    final_date: "",
    estimated_hours: 0,
  };

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) errors.name = "Required";
    if (!values.initial_date) errors.initial_date = "Required";
    if (!values.final_date) errors.final_date = "Required";
    if (!values.estimated_hours) errors.estimated_hours = "Required";
    return errors;
  };

  const onSubmit = async (values: any) => {
    setCreating(true);
    try {
      const newProject = {
        ...values,
        initial_date: new Date(values?.initial_date).toISOString(),
        final_date: new Date(values?.final_date).toISOString(),
      };
      await createProject(newProject);
      toast.success("Proyecto creado correctamente");
    } catch {
      toast.error("Error al crear el proyecto");
    }
    setCreating(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Nuevo Proyecto</h2>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <FormField name="name" placeholder="Event Name" />
              <FormField name="initial_date" type="date" />
              <FormField name="final_date" type="date" />
              <FormField name="estimated_hours" type="number" />
            </div>
            <br />
            <Button variant="contained" color="primary" type="submit">
              Crear Proyectos
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NewProjectModal;
