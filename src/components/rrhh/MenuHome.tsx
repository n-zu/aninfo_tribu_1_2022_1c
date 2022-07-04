import React from 'react'
import Button from '@mui/material/Button';

export default function MenuHome(props: { handleNew: () => void }){
  return (
  // <div style={{ padding: '10px', display: 'flex',justifyContent: 'space-between'}}>
    <div style={{display: 'flex ', flexDirection: 'column'}}>
      <h1 style={{fontSize: '40px'}}>Registros de horas</h1>
      <div style={{display: 'flex ', flexDirection:"row",  justifyContent:"space-between"}}>
        <h1 style={{fontSize: '20px'}}>Seleccione un registro para editarlo</h1>
        <div style={{display: 'flex ', flexDirection:"row", gap:"20px", alignItems:"center"}}>
          <Button 
            variant="outlined" 
            href='rrhh/recursos'>
            Recursos
          </Button>
          <Button
            style={{
              whiteSpace: "nowrap",
              padding: "0 2em",
              height: "2.5em",
              minWidth: "10em",
            }}
            variant="contained"
            color="primary"
            onClick={props.handleNew}>
            Cargar Horas
          </Button>
        </div>
      </div>
    </div>
  // </div>
)};