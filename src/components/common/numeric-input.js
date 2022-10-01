import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function NumericInput(props) {
  const { value = 0, handleChange = () => {}, name, ...params } = props;
  return (
    <NumericFormat
      value={value}
      prefix="R$"
      decimalScale={2}
      decimalSeparator={","}
      onValueChange={(values) => {
        const target = {
          value: values.floatValue,
          name: name,
        };
        return onChange({ target });
      }}
      customInput={TextField}
      {...params}
    />
  );
}
