import * as React from 'react';
import { TextField, Popper } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { Options } from "../../services/types";

type BarProps = {
  options?: Options[];
};

export default function AutoComplete({ options }: BarProps) {

  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options!}
      getOptionLabel={(option) => option.id + " - " + option.name}
      fullWidth
      renderInput={(params) => <TextField {...params} label="Proyecto" sx={{}}/>}
      freeSolo
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onClose={() => setOpen(false)}
    />
  );
}
