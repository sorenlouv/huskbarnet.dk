import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import { getDate, ageGroups } from '../services/getRemindersHelpers';
import { formatDate } from '../services/date';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  introText: {
    fontSize: '13px',
    marginRight: '10%'
  },
  table: {
    width: '100%'
  }
});

function getDescription(group) {
  const { examination, vaccination } = group;
  if (examination && vaccination) {
    return `Vaccination og børneundersøgelse`;
  } else if (vaccination) {
    return `Vaccination`;
  } else {
    return `Børneundersøgelse`;
  }
}

function ViewKid({ classes, kid }) {
  return (
    <div className={classes.root}>
      <div className={classes.introText}>
        Du vil modtage påmindelser for vaccinationer og børneundersøgelser for{' '}
        {kid.name} på følgende datoer:
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Alder</TableCell>
            <TableCell>Dato</TableCell>
            <TableCell>Beskrivelse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ageGroups.map((group, i) => {
            const d = getDate(kid.dateOfBirth, group.daysAfterBirth, true);
            const date = formatDate(d);

            return (
              <TableRow key={i}>
                <TableCell>{group.title}</TableCell>
                <TableCell>{date}</TableCell>
                <TableCell>{getDescription(group)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

ViewKid.propTypes = {
  classes: PropTypes.object.isRequired,
  kid: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewKid);
