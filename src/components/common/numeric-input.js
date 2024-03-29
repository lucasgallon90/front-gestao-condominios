import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

export default function NumericInput(props) {
  const {
    value = 0,
    onChange = () => {},
    prefix = "R$ ",
    name,
    decimalScale = 2,
    ...params
  } = props;
  return (
    <NumericFormat
      name={name}
      value={value}
      prefix={prefix}
      decimalScale={decimalScale}
      allowedDecimalSeparators={[",","."]}
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
