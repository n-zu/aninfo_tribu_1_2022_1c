
import { Chip, CircularProgress, Typography } from "@mui/material";
import { useRecurso } from "@services/rrhh";
import { supportAPIUrl } from "@services/support";
import { toast } from "react-toastify";

const TaskChip = ({ responsableId, deleteResponsable }: any) => {
  const { recurso, error, loading, ...rest } = useRecurso(responsableId);
  
  if(!recurso){

    if(!loading) {
      deleteResponsable(responsableId)
      toast.error("No existe ningun recurso asociado a ese legajo");
    }
    return(
        <CircularProgress style={{width: 20, height: 20, marginLeft: 10, marginRight: 10}} />
    )
  }
    
  return (
    <Chip
      label={`${responsableId} ${recurso?.name} ${recurso?.lastname}` ?? ""}
      onDelete={() => deleteResponsable(responsableId)}
    />
  );
};

const ResponsablePicker = ({ ticket, setResponsables, responsables }: any ) => {


  const addResponsable = async () => {


    // TODO: Mostrar un dialogo para seleccionar una tarea
    const responsableId = await prompt("Ingrese el legajo del responsable");

    if (!responsableId) return;

    

    if(ticket.id) {
      await fetch(`${supportAPIUrl}/tickets/${ticket.id}/employees?employee_id=${responsableId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    }
    
    setResponsables([...responsables, responsableId]);
  };

  const deleteResponsable = async (responsableId: number) => {
    if (ticket.id) {
      await fetch(
        `${supportAPIUrl}/tickets/${ticket?.id}/employees?employee_id=${responsableId}`,
        {
          method: "DELETE",
        }
      )
      .then(() => {
        setResponsables(responsables.filter((responsable: number) => responsable !== responsableId));
      })
      .catch((err) => {
        console.error(err);
        toast.error(
          "Debe haber al menos un responsable"
        );
      });
    }
    if (!ticket.id)
      setResponsables(responsables.filter((responsable: number) => responsable !== responsableId));
    
  };

  return (
    <Typography component={'span'}>
      Responsable/s:{" "}
      {responsables.map((id: number) => (
        <TaskChip key={id} responsableId={id} deleteResponsable={deleteResponsable} />
      ))}
      <Chip label="+" onClick={addResponsable} />
    </Typography>
  );
};

export default ResponsablePicker;
