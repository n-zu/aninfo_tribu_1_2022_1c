import * as React from 'react';
import { TextField, Popper } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { Options } from "../../services/types";

type BarProps = {
  options?: Options[];
};

const PopperMy = function (props: any) {
  return (<Popper {...props} style={{ width: 25000, maxHeight: '50%' }} placement='bottom-start' />)
}

export default function AutoComplete({ options }: BarProps) {
  return (
    <div style={{display: 'flex', alignItems: 'flex-start', width: '100%', columnGap: 1000}}>
    <Autocomplete
      id="combo-box-demo"
      options={options!}
      getOptionLabel={(option) => option.id + " - " + option.name}
      sx={{}}
      style={{}}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Proyecto" sx={{}}/>}
    />
    </div>
  );
}
