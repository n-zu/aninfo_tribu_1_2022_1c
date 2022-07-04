import { Box, Avatar, Typography, Alert } from "@mui/material";
import { useEmployee } from "../../../services/projects";
import Loading from "../../common/Loading";
import TitledText from "../../common/TitledText";

const EmployeeAvatarWrapper = ({ id }: { id?: number }) => (
  <div>
    <TitledText title="Empleado asignado">
      {id ? <EmployeeAvatar id={id} /> : null}
    </TitledText>
  </div>
);

const EmployeeAvatar = ({ id }: { id: number }) => {
  const { employee, loadingEmployee, error } = useEmployee(id);
  const name = `${employee?.name} ${employee?.lastname}`;
  return (
    <>
      {loadingEmployee && !error ? <Loading center={false} size={30} /> : null}
      {error && !employee ? (
        <Alert severity="error" style={{ width: "fit-content" }}>
          No se pudo cargar el empleado asignado
        </Alert>
      ) : null}
      {employee ? (
        <Box
          component="li"
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <Avatar
            style={{
              backgroundColor: "gray",
              height: "24px",
              width: "24px",
              fontSize: "10pt",
            }}
          >
            {name?.[0]}
          </Avatar>
          <Typography>{name}</Typography>
        </Box>
      ) : null}
    </>
  );
};

export default EmployeeAvatarWrapper;
