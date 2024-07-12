import { TextField, MenuItem } from "@mui/material";

const AltanSelect = ({
  id,
  variant = "standard",
  children,
  onChange,
  value,
  size = "small",
  sxProps,
  color = "info",
  minWidth = "20ch",
  defaultValue,
  data,
  dataTextAttr,
  dataValueAttr,
  isAll,
  ...rest
}) => {
  return (
    <TextField
      select
      focused
      id={id}
      defaultValue={defaultValue}
      variant={variant}
      value={value}
      size={size}
      color={color}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      sx={{
        minWidth: { minWidth },
        p: 1,
        ...sxProps,
      }}
      {...rest}
    >
      {isAll && (
        <MenuItem value="Tümü" sx={{ fontWeight: 400, color: { color } }}>
          Tümü
        </MenuItem>
      )}
      {data.map((option) => (
        <MenuItem
          key={option[dataValueAttr]}
          value={option[dataValueAttr]}
          sx={{ fontWeight: 400, color: { color } }}
        >
          {option[dataTextAttr]}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default AltanSelect;
