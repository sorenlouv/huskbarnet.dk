import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { getDates, vaccinationTitles } from '../services/getRemindersHelpers';
import { formatDate } from '../services/date';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    width: '100%'
  }
});

function ViewKid({ classes, kid }) {
  const dates = getDates(kid.dateOfBirth, true);

  return (
    <Paper className={classes.root}>
      <p>
        Du vil modtage påmindelser for vaccinationer for {kid.name} på følgende
        datoer:
      </p>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Alder</TableCell>
            <TableCell>Dato</TableCell>
            <TableCell>Beskrivelse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dates.map((date, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{vaccinationTitles[i]}</TableCell>
                <TableCell>{formatDate(date)}</TableCell>
                <TableCell>TODO</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ViewKid.propTypes = {
  classes: PropTypes.object.isRequired,
  kid: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewKid);
