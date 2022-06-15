import * as React from 'react';
import { TextField, Popper } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { Options } from "../../services/types";

type BarProps = {
  options: Options[];
  label: string;
};

const loadingOptions: Options = {
  id: 0,
  name: 'Loading'
}

export default function AutoComplete({ options, label }: BarProps) {

  const [open, setOpen] = React.useState(false);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options || [loadingOptions]}
      getOptionLabel={(option) => option.id + " - " + option.name}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label} sx={{}}/>}
      freeSolo
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onChange={(event, value) => console.log(value)}
      onClose={() => setOpen(false)}
    />
  );
}
