import * as React from 'react';
import { TextField } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { Options } from "../../services/types";
import { useRouter } from 'next/router';

type BarProps = {
  options: Options[];
  label: string;
  routeFunction: Function;
};

const loadingOptions: Options = {
  id: 0,
  name: 'Loading'
}

export default function AutoComplete({ options, label, routeFunction }: BarProps) {

  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  return (
    <Autocomplete
      id="combo-box-demo"
      options={options || [loadingOptions]}
      getOptionLabel={(option) => option.id + " - " + option.name}
      fullWidth
      renderInput={(params) => <TextField {...params} label={label}/>}
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onChange={(_, value) => routeFunction(value?.id, router)}
      onClose={() => setOpen(false)}
      autoHighlight
      popupIcon={null}
    />
  );
}
