import { Field, ErrorMessage } from "formik";
import styles from "./FormField.module.css";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  datalistOptions?: string[];
  selectOptions?: {
    id: string;
    name: string;
  }[];
};

const FormField = ({
  label,
  name,
  placeholder,
  type,
  datalistOptions,
  selectOptions,
}: Props) => {
  const field = (
    <Field
      name={name}
      type={type ?? "text"}
      placeholder={placeholder}
      list={datalistOptions && `${name}-datalist`}
      // @ts-ignore
      as={(type === "select") | selectOptions ? "select" : "input"}
      className={styles.Field}
    >
      {selectOptions?.map(({ id, name }, i) => (
        <option key={i} value={id}>
          {name}
        </option>
      ))}
    </Field>
  );

  const datalist = datalistOptions && (
    <datalist id={`${name}-datalist`}>
      {datalistOptions.map((value, i) => (
        <option value={value} key={i} />
      ))}
    </datalist>
  );

  return (
    <>
      <h3 className={styles.Label}>{label ?? name}</h3>

      {field}

      <ErrorMessage name={name} component="div" className={styles.Error} />

      {datalist}
    </>
  );
};

export default FormField;
