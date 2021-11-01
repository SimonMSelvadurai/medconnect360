import { QUERY_ALL_DOCTOR_NAMES } from '../gql/queries';
import { useQuery } from '@apollo/client';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 10px',
        maxWidth: 950
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

function Dashboard() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { loading, data } = useQuery(QUERY_ALL_DOCTOR_NAMES);
  const doctors = data?.doctors || {};
  console.log("doctors",doctors);

let DOCTORS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
for(let i=0;i<doctors.length;i++) {
  DOCTORS[i] = {
        docId :doctors[i]._id,
        fullName: doctors[i].fullName,
        email: doctors[i].email,
        contactNumber: doctors[i].contactNumber,
        specialization: doctors[i].specialization,
        clinicAddress: doctors[i].clinicAddress,
        clinicName: doctors[i].clinicName,
        // status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
        status:'Active',
    }
}
console.log(DOCTORS);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Doctor's Detail </TableCell>
            <TableCell className={classes.tableHeaderCell}>Clinic Info</TableCell>
            <TableCell className={classes.tableHeaderCell}>clinic Address</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DOCTORS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            
            <TableRow key={row.fullName}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.fullName} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.fullName}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.specialization}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.contactNumber}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.clinicName}</Typography>
                  {/* <Typography color="textSecondary" variant="body2">{row.clinicAddress}</Typography> */}
                </TableCell>
              <TableCell>{row.clinicAddress}</TableCell>
              <TableCell>
                  <Typography 
                    className={classes.status}
                    style={{
                        backgroundColor: 
                        ((row.status === 'Active' && 'green') ||
                        (row.status === 'Pending' && 'blue') ||
                        (row.status === 'Blocked' && 'orange'))
                    }}
                  >{row.status}</Typography>

                  <Typography >
       



                {/* <button onClick = {()=>window.location.href = `http://localhost:3000/booking/617a0b73d7911554c8e3655c`} >Book Appointment</button> */}

                {/* <button onClick = {(e)=>{ history.push(`/booking/617a0b73d7911554c8e3655c`)}}>  Submit       </button> */}
                {/* <Link
                className="btn btn-block btn-squared btn-light text-dark"
                to={`/booking/${row.docId}`}>
                Book Appointment
              </Link> */}
                {/* <button onClick = {(e)=>{ history.push()}}> */}
                  </Typography>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={DOCTORS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default Dashboard;
