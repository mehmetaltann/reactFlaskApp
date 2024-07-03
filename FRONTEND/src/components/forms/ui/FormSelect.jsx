import { TextField } from "@mui/material";

const FormSelect = ({ children, form, field, ...rest }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    <TextField
      select
      type="text"
      sx={{ width: "100%" }}
      name={name}
      value={value ?? ""}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
      size="small"
      {...rest}
    >
      {children}
    </TextField>
    
  );
};

export default FormSelect;
