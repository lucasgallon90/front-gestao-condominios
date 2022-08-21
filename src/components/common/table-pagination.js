import { TablePagination } from "@mui/material";

export const TablePaginationComponent = ({
  registers,
  handlePageChange,
  handleLimitChange,
  page,
  limit,
}) => (
  <TablePagination
    component="div"
    count={registers?.length}
    onPageChange={handlePageChange}
    onRowsPerPageChange={handleLimitChange}
    page={page}
    rowsPerPage={limit}
    rowsPerPageOptions={[10, 15, 25]}
  />
);
