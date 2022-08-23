import React from "react";
import { IMaskInput } from "react-imask";

export const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, mask = "(00) 0 0000-0000", ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={mask}
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
