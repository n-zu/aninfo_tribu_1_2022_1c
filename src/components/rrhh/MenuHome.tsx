import React from 'react'
import Button from '@mui/material/Button';

export default function MenuHome(props: { handleNew: () => void }){
  return <div style={{ padding: '10px', display: 'flex',justifyContent: 'space-between'}}>
            <div style={{display: 'flex ',justifyContent: 'space-around', flexDirection: 'column'}}>
              <h1 style={{fontSize: '40px'}}>Historial de Cargas de Horas</h1>
              <h1 style={{fontSize: '20px'}}>Menu</h1>
              <div style={{display: 'flex ', gap: '25px',alignItems: 'center'}}>
                  <Button variant="outlined" href='rrhh/recursos'>Ver Recursos</Button>
                  <Button
                      style={{
                        whiteSpace: "nowrap",
                        padding: "0 2em",
                        height: "2.5em",
                        minWidth: "10em",
                      }}
                      variant="contained"
                      color="primary"
                      onClick={props.handleNew}
                    >
                      Cargar Horas
                    </Button>
              </div>
            </div>
          </div>

};