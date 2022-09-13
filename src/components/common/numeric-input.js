import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function NumericInput(props) {
  const { value = 0, handleChange = () => {}, ...params } = props;
  return (
    <NumericFormat
      value={value}
      prefix="R$"
      decimalScale={2}
      decimalSeparator={","}
      onValueChange={(values) => {
        handleChange(values.floatValue);
      }}
      customInput={TextField}
      {...params}
    />
  );
}
