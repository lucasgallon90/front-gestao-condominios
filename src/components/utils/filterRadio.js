import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useEffect } from "react";

export default function FilterRadio({ filters, selected, handleChangeSelectedFilter = () => null }) {
  useEffect(() => {
    if (filters?.length > 0) {
      handleChangeSelectedFilter(filters[0].value);
    }
  }, [filters]);

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        {filters?.map((filter) => (
          <FormControlLabel
            key={filter.value}
            value={filter.value}
            control={<Radio size="small" />}
            label={filter.label}
            checked={selected === filter.value}
            onChange={(e)=>handleChangeSelectedFilter(e.target.value)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
