import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, isValid } from "date-fns";
import moment from "moment";
import Router from "next/router";
import { Download as DownloadIcon } from "../../icons/download";
import { Search as SearchIcon } from "../../icons/search";
import { exportPDF } from "../../utils/export-pdf";
import FilterRadio from "../utils/filterRadio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const SearchToolbar = ({
  selectedFilter,
  setSelectedFilter = () => {},
  filterValue,
  setFilterValue = () => {},
  list,
  dataExport,
  headExport,
  filenameExport = "export",
  ...props
}) => {
  function handleClickExportar() {
    exportPDF({
      title: props?.title,
      head: headExport,
      data: dataExport,
      filename: filenameExport,
    });
  }

  function handleClickAdicionar() {
    if (props.url) {
      Router.push(`/${props.url}/add`);
    }
  }

  function handleChangeSearchInput(event) {
    setFilterValue(event.target.value);
  }

  function handleChangeDate(value) {
    setFilterValue(value);
    list(value);
  }

  function handleChangeMesAno(value) {
    setFilterValue(value);
    if (isValid(new Date(value)) && value) {
      list(format(new Date(value), "yyyy-MM"));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    list();
  }

  function handleChangeSelectedFilter(value) {
    setSelectedFilter(value);
    setFilterValue("");
  }

  return (
    <>
      <Box {...props}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: -1,
          }}
        >
          <Typography sx={{ m: 1 }} variant="h4">
            {props?.title}
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button
              id="exportar"
              startIcon={<DownloadIcon fontSize="small" />}
              sx={{ mr: 1 }}
              onClick={handleClickExportar}
            >
              Exportar
            </Button>
            {!props.addButtonHide && (
              <Button id="add" color="primary" variant="contained" onClick={handleClickAdicionar}>
                Adicionar
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Box sx={{ maxWidth: 500 }}>
                  {props?.filters?.find((filter) => filter.value === selectedFilter)?.type ===
                    "date" && (
                    <DatePicker
                      value={filterValue || undefined}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                  {props?.filters?.find((filter) => filter.value === selectedFilter)?.type ===
                    "mesAno" && (
                    <DatePicker
                      views={["year", "month"]}
                      label="Mês/Ano"
                      minDate={moment().subtract(3, "years").toDate()}
                      maxDate={moment().add(3, "years").toDate()}
                      value={filterValue}
                      onChange={handleChangeMesAno}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth helperText={null} />
                      )}
                    />
                  )}
                  {props?.filters?.find((filter) => filter.value === selectedFilter)?.type !=
                    "date" &&
                    props?.filters?.find((filter) => filter.value === selectedFilter)?.type !=
                      "mesAno" && (
                      <TextField
                        autoComplete="off"
                        value={filterValue}
                        onChange={handleChangeSearchInput}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SvgIcon
                                sx={{ cursor: filterValue?.length > 0 && "pointer" }}
                                color="action"
                                fontSize="small"
                                onClick={(e) => filterValue?.length > 0 && handleSubmit(e)}
                              >
                                <SearchIcon />
                              </SvgIcon>
                            </InputAdornment>
                          ),
                        }}
                        placeholder={"Pesquisar"}
                        variant="outlined"
                      />
                    )}
                  <FilterRadio
                    filters={props?.filters}
                    selected={selectedFilter}
                    handleChangeSelectedFilter={handleChangeSelectedFilter}
                  ></FilterRadio>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
