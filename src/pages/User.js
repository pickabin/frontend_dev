import { Link as RouterLink } from 'react-router-dom';
import { filter } from 'lodash';
import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// material
import {
  Card,
  Table,
  Stack,
  Link,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material';

import Typography from '@mui/material/Typography';

import axios from 'axios';
import {API_PETUGAS}  from '../api/api';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead} from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nama', label: 'Nama', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'alamat', label: 'Alamat', alignRight: false },
  { id: 'notelp', label: 'No Telp', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.nama.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [petugas, setPetugas] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('nama');

  const [filterNama, setFilterNama] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  React.useEffect(() => {
    axios.get(API_PETUGAS)
      .then(res => {
        const petugas = res.data;
        setPetugas(petugas.data);
        console.log("data petugas", petugas);
      })
  }, []);


    const PETUGASLIST =  petugas.map((petugas) => {
      return {
        id: petugas.user.id,
        nama: petugas.user.name,
        email: petugas.user.email,
        alamat: petugas.user.address,
        photo : petugas.user.photo,
        notelp: petugas.user.phone,
      };
    });

    


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByNama = (event) => {
    setFilterNama(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PETUGASLIST.length) : 0;

  const filteredUsers = applySortFilter(PETUGASLIST, getComparator(order, orderBy), filterNama);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Profile Petugas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Petugas
          </Typography>
        </Stack>

        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, nama, alamat, email, photo, notelp } = row;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                      >

                        <TableCell component="th" scope="row" padding="checkbox">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={nama} src={photo} />
                            <Typography variant="subtitle1" noWrap>
                              {nama}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle1"> {email}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle1"> {alamat} </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Button>
                            <Link variant="subtitle1" color="text.primary" href="https://wa.me/62{notelp}">
                              <WhatsAppIcon fontSize="small">wa</WhatsAppIcon>
                              {notelp}
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterNama} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}