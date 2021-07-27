/*eslint-disable*/
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  TableHead,
  IconButton,
} from '@material-ui/core';
import { ReactComponent as RightIcon } from 'assets/svg/arrow_right.svg';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
    icon: {
      '-webkit-transform:': 'rotate(180deg)',
      '-moz-transform': 'rotate(180deg)',
      '-ms-transform': 'rotate(180deg)',
      '-o-transform': 'rotate(180deg)',
      transform: 'rotate(180deg)',
    },
    iconActive: {
      '& path': {
        fill: theme.colors.primary || 'currentColor',
      },
    },
  }),
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

export interface ITableCellProps {
  classes?: any;
  className?: any;
  align?: string;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <RightIcon
          className={`${classes.icon} ${page === 0 ? '' : classes.iconActive}`}
        />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <RightIcon
          className={
            page >= Math.ceil(count / rowsPerPage) - 1 ? '' : classes.iconActive
          }
        />
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      borderRadius: 10,
      backgroundColor: theme.colors.darkGray,
      color: theme.colors.white
    },
    table: {
      minWidth: 500,
    },
    header: {
      fontWeight: theme.typography.fontWeightMedium,
    },
    notFoundCell: {
      borderBottom: 'none',
    },
    skeletonCell: {
      padding: 5,
      borderBottom: 'none',
    },
    skeleton: {
      height: 33,
    },
    head: {
      maxWidth: 160,
      padding: '13px 0 13px 8px',
      ...theme.typography.overline,
      fontWeight: theme.typography.fontWeightMedium,
      color: `${theme.colors.white}6A`,
      borderBottom: 'none'
    },
    headerRow: {
      background: theme.colors.darkGray,
    },
    body: {
      fontSize: 14,
      maxWidth: 160,
      padding: '13px 0 13px 8px',
      ...theme.typography.overline,
    },
    cell: {
      color: theme.colors.white,
      borderBottom: `1px solid ${theme.colors.inputBorder}`
    }
  }),
);

export const TableList = ({
  columns,
  data,
  rowsPerPage = 50,
  setRowsPerPage,
  totalCount,
  fetchMoreRows,
  notFoundText,
  isHeaderVisible = true,
  loading = false
}: {
  columns: any;
  data: any;
  totalCount?: number;
  rowsPerPage?: number;
  fetchMoreRows?: () => void;
  setRowsPerPage?: (val: number) => void;
  notFoundText?: string;
  isHeaderVisible?: boolean;
  loading?: boolean;
}) => {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (fetchMoreRows && newPage > page && data.length > page * rowsPerPage) {
      fetchMoreRows();
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (setRowsPerPage) setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer className={classes.root} component="div">
      <Table className={classes.table} aria-label="custom pagination table">
        {isHeaderVisible && (
          <TableHead className={classes.headerRow}>
            <TableRow>
              {columns.map((header: any) => (
                <TableCell
                  key={header.label}
                  className={classes.header}
                  classes={{
                    head: classes.head,
                    body: classes.body,
                  }}
                  style={{ width: `${header.size || 150}px` }}
                  align="left"
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row: any, idx: number) => {
            const rowValue = row.node ?? row;
            return (
              <TableRow key={idx}>
                {columns.map((column: any) => {
                  const Component = column.component;
                  const value = column.key ? rowValue[column.key] : rowValue;
                  const textValue =
                    column.key === 'srNumber'
                      ? page * rowsPerPage + idx + 1
                      : rowValue[column.key];
                  return (
                    <TableCell
                      key={column.key}
                      className={classes.cell}
                      style={
                        column.cellStyle
                          ? column.cellStyle
                          : { width: `${column.size || 150}px` }
                      }
                      align="left"
                    >
                      {Component ? <Component value={value} /> : textValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {loading && !data?.length
            ? [...Array(10)].map((_, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow key={idx}>
                  <TableCell className={classes.skeletonCell} colSpan={12}>
                    <Skeleton
                      classes={{ wave: classes.skeleton }}
                      animation="wave"
                    />
                  </TableCell>
                </TableRow>
              ))
            : null}
          {emptyRows && !loading  ? (
            <TableRow style={{ height: 33 * emptyRows }}>
              {!data.length && (
                <TableCell className={classes.notFoundCell} colSpan={12}>
                  <span>{notFoundText}</span>
                </TableCell>
              )}
            </TableRow>
          ) : null}
        </TableBody>
        {data.length ? (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                align="left"
                count={totalCount || data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                labelRowsPerPage="Rows per page"
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </TableContainer>
  );
};
