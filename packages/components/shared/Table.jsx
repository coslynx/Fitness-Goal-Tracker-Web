import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableRow, TableCell, TableContainer, TablePagination } from '@material-ui/core';
import { styled } from '@emotion/styled';

const StyledTable = styled(Table)`
  &.MuiTable-root {
    /* Add your custom styles for the table here. */
  }
`;

const Table = ({ rows, columns, onRowClick, selectedRow, stickyHeader, className, ...rest }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Data Validation
  if (!Array.isArray(rows) || !rows.length) {
    console.error('Error: "rows" prop must be a non-empty array of objects.');
    return null;
  }

  if (!Array.isArray(columns) || !columns.length) {
    console.error('Error: "columns" prop must be a non-empty array of objects.');
    return null;
  }

  const handleRowClick = (row) => {
    onRowClick && onRowClick(row);
  };

  return (
    <TableContainer className={className} {...rest}>
      <StyledTable stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => handleRowClick(row)}
                selected={selectedRow && row === selectedRow}
              >
                {columns.map((column) => (
                  <TableCell key={column.key}>{row[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTable>
    </TableContainer>
  );
};

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      // Define the shape of the row object based on your data structure
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRowClick: PropTypes.func,
  selectedRow: PropTypes.object,
  stickyHeader: PropTypes.bool,
  className: PropTypes.string,
};

Table.defaultProps = {
  onRowClick: null,
  selectedRow: null,
  stickyHeader: false,
};

export default Table;