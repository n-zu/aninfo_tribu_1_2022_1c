import type { NextPage } from "next";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


const Home: NextPage = () => {
  const links = [
    { href: "/rrhh/registro_de_horas/proyecto/tarea/recurso", label: "recurso" },
    { href: "/rrhh/registro_de_horas/proyecto",label: "carga_horas" },
  ];
  return (
    <div className="page" style={{ margin:'25px', padding: '40px', display: 'flex',justifyContent: 'space-between'}}>
        <div style={{display: 'flex ',justifyContent: 'space-around', flexDirection: 'column'}}>
          <h1 style={{fontSize: '40px'}}>PSA</h1>
          <div style={{display: 'flex ', gap: '25px',alignItems: 'center'}}>
            <h1 style={{fontSize: '24px'}}>RRHH</h1>
            <Button sx={{}} href={"/rrhh/registro_de_horas/proyecto/tarea/recurso"} variant="outlined">Ver Recursos</Button>
          </div>
        </div>
      <div style={{float: 'right',display: 'flex ', justifyContent: 'space-around', alignItems: 'center',flexDirection: 'column'}}>
          <Avatar src="/broken-image.jpg" sx={{ width: 50, height: 50 }} />
          <Button href={"/rrhh/registro_de_horas/proyecto"} variant="outlined">Carga de Horas</Button>
      </div>
    </div>
  );
};

export default Home;
