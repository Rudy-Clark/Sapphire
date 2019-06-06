import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    width: 540,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: '0 auto',
  },
}));

function UsersTable({ children }) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Посты</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </Paper>
  );
}
UsersTable.propTypes = {
  children: PropTypes.array,
};

export default UsersTable;
