import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
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
import {API_AKTIVITASPETUGAS}  from '../api/api';

// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'hari', label: 'hari', alignRight: false },
  { id: 'tanggal', label: 'tanggal', alignRight: false },
  { id: 'waktu', label: 'waktu', alignRight: false },
  { id: 'foto', label: 'Piket', alignRight: false },
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
    return filter(array, (_user) => _user.hari.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Piket() {
  const location = useLocation();
  console.log("location", location.state);
  const history = useNavigate();

  useEffect(() => {
    if(location.state == null){
      history('/dashboard/monitor');
    }else{
        axios.get(API_AKTIVITASPETUGAS+location.state.userid)
      .then(response => {
        const aktivitas = response.data;
        setAktivitas(aktivitas.data);
        console.log("data Aktivitas", aktivitas);
    })
    }
    
  }, [location.state, history]);


  const [aktivitas, setAktivitas] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('hari');

  const [filterhari, setFilterhari] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  
  
  const AKTIVITASLIST = aktivitas.map((aktivitas) => {
    return {
      id: aktivitas.id,
      hari: new Date(aktivitas.date).toLocaleDateString('id-ID', { weekday: 'long' }),
      tanggal: new Date(aktivitas.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
      waktu: new Date(aktivitas.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      img: aktivitas.jadwal.user.photo,
      photo: aktivitas.photo
    };
  });


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = AKTIVITASLIST.map((n) => n.hari);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, hari) => {
    const selectedIndex = selected.indexOf(hari);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, hari);
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

  const handleFilterByhari = (event) => {
    setFilterhari(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AKTIVITASLIST.length) : 0;

  const filteredUsers = applySortFilter(AKTIVITASLIST, getComparator(order, orderBy), filterhari);

  const isUserNotFound = filteredUsers.length === 0;

  return !location.state ?(
    <h1>Forbidden</h1>
   ): (
    <Page title="Profile Petugas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            <Button href="monitor" variant="contained">
              Back Monitor
            </Button>
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterhari={filterhari} onFilterhari={handleFilterByhari} />

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
                    const { id, hari, waktu, tanggal, img, photo } = row;
                    const isItemSelected = selected.indexOf(hari) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        waktu="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, hari)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          {hari}
                        </TableCell>
                        <TableCell align="left">{tanggal}</TableCell>
                        <TableCell align="left">{waktu}</TableCell>
                        <TableCell align="left">
                          <Button href={photo}>
                            Check Foto
                            <Iconify icon="eva:image-2-fill" />
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
                        <SearchNotFound searchQuery={filterhari} />
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
