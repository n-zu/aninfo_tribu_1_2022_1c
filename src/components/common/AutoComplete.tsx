import * as React from "react";
import { TextField, Autocomplete } from "@mui/material";
import { Options } from "../../services/types";
import { zeroPad } from "../../util/util";
import { useRouter } from "next/router";

type BarProps = {
  options: Options[];
  label: string;
  routeFunction: Function;
  icon?: React.ReactNode;
};

const loadingOptions: Options = {
  id: 0,
  name: "Loading",
};

export default function AutoComplete({
  options,
  label,
  routeFunction,
  icon = null,
}: BarProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const router = useRouter();

  return (
    <Autocomplete
      id="combo-box-demo"
      options={options || [loadingOptions]}
      getOptionLabel={(option) =>
        zeroPad(option?.id ?? 0) + " - " + option.name
      }
      fullWidth
      renderInput={(params) => (
        <TextField {...params} variant="standard" label={label} />
      )}
      open={open}
      onInputChange={(_, value) => {
        if (value.length === 0) {
          if (open) setOpen(false);
        } else {
          if (!open) setOpen(true);
        }
      }}
      onChange={(_, value) => {setValue(null); routeFunction(value?.id, router);}}
      onClose={() => setOpen(false)}
      autoHighlight
      clearOnEscape
      value={value}
      popupIcon={icon}
    />
  );
}
