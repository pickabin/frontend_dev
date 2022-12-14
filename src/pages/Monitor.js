import { filter } from 'lodash';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import axios from 'axios';
import {API_PETUGAS}  from '../api/api';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nama', label: 'Nama', alignRight: false },
  { id: 'gedung', label: 'Gedung', alignRight: false },
  { id: 'tempat', label: 'Tempat', alignRight: false },
  { id: 'notelp', label: 'Piket', alignRight: false },
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

export default function Monitor() {
  const [petugas, setPetugas] = useState([]);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

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
      tempat: petugas.clean_area,
      gedung : petugas.code,
      photo : petugas.user.photo,
    };
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = PETUGASLIST.map((n) => n.nama);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, nama) => {
    const selectedIndex = selected.indexOf(nama);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, nama);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
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
            Monitor
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterNama={filterNama} onFilterNama={handleFilterByNama} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, nama, tempat, gedung, photo } = row;

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
                          <Typography variant="subtitle1">{gedung}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="subtitle1">{tempat}</Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Link to='piket' state={{ userid: id }} >
                            <Button variant="contained">
                                Detail
                            </Button>
                          </Link>
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
