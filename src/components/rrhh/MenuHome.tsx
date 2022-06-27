import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const MenuHome = () => {
  return <div style={{ padding: '10px', display: 'flex',justifyContent: 'space-between'}}>
            <div style={{display: 'flex ',justifyContent: 'space-around', flexDirection: 'column'}}>
              <h1 style={{fontSize: '40px'}}>Historial de Cargas de Horas</h1>
              <h1 style={{fontSize: '20px'}}>Menu</h1>
              <div style={{display: 'flex ', gap: '25px',alignItems: 'center'}}>
                  <Button variant="outlined" href='rrhh/recursos'>Ver Recursos</Button>
                  <Button variant="outlined">Carga de Horas</Button>
              </div>
            </div>
          </div>

}

export default MenuHome;