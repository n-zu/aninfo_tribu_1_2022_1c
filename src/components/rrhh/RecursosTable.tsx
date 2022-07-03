import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Recurso } from '../../services/types';


function Row(props: { row: Recurso }) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center" component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.lastname}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function 
  CollapsibleTable(props:
  { recursos:Recurso[],
    error: any;
    loading: boolean;
  }){
  return (
    <TableContainer component={Paper} sx={{width: "100%", justifyContent: "center"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Legajo</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Apellido</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.recursos?.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
