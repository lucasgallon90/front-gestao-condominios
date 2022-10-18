import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function AutoComplete(props) {
  const {
    data = [],
    id = "auto-complete",
    label,
    loadOptions = () => [],
    selectedValue = null,
    handleChangeSelectedValue = () => [],
    optionKey = "_id",
    optionLabel = "label",
    required = false,
    name = "auto-complete",
    errors,
    disabled = false,
  } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useForm();

  async function handleChangeKey(event) {
    if (event.target.value) {
      setLoading(true);
      await loadOptions();
      setLoading(false);
    }
  }

  return (
    <Autocomplete
      id={id}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onKeyUp={handleChangeKey}
      value={selectedValue}
      disabled={disabled}
      onChange={({}, value) => handleChangeSelectedValue(value)}
      isOptionEqualToValue={(option, value) => option[optionKey] === value[optionKey]}
      getOptionLabel={(option) => option[optionLabel]}
      options={data}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...register(name, {
            required: required,
          })}
          {...params}
          label={label}
          required={required}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          error={errors[name] ? true : false}
          helperText={errors[name] ? "Campo obrigatório" : ""}
        />
      )}
    />
  );
}
