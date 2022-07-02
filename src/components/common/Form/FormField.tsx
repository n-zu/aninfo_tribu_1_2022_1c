import { Field, ErrorMessage } from "formik";
import { TextField, Autocomplete as AutoMui } from "@mui/material";
import styles from "./FormField.module.css";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  datalistOptions?: string[];
  multiline?: boolean;
  setFieldValue?: (name: string, value: any) => void;
  [x: string]: any;
};

const FormField = ({
  label,
  name,
  placeholder,
  type,
  datalistOptions,
  setFieldValue,
  ...rest
}: Props) => {
  if (type == "date") rest.InputLabelProps = { shrink: true };
  if (type == "autocomplete") rest.setFieldValue = setFieldValue;

  const field = (
    <Field
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      list={datalistOptions && `${name}-datalist`}
      as={type === "autocomplete" ? AutoComplete : TextField}
      className={styles.Field}
      label={label ?? name}
      {...rest}
    />
  );

  const datalist = datalistOptions && (
    <datalist id={`${name}-datalist`}>
      {datalistOptions.map((value, i) => (
        <option value={value} key={i} />
      ))}
    </datalist>
  );

  return (
    <div style={{ marginTop: "15px" }}>
      {field}

      <ErrorMessage name={name} component="div" className={styles.Error} />

      {datalist}
    </div>
  );
};

const AutoComplete = ({ setFieldValue, ...params }: any) => {
  return (
    <AutoMui
      renderInput={(props) => <TextField label={params.label} {...props} />}
      {...params}
      onChange={(_, value) => setFieldValue(params.name, value)}
    />
  );
};

export default FormField;
