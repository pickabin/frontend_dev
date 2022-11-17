import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Tab, Button, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { sizing, typography,spacing } from '@mui/system';

// Modal
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

// Input Camera
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box from '@mui/material/Box';

// axios
import axios from 'axios';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Date & Time
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

// firebase
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

// import API_KOORGEDUNG
import { API_KOORGEDUNG, API_LAPORKOTORINSERT, API_LAPORACARAINSERT } from '../../api/api';

import logo from '../../images/logo2.png';
import { Logo } from './Header.style';
import DrawerComp from './Drawer';
import { storage } from '../../firebase';

const Header = () => {
  // const [value, setValue] = useState();
  const theme = useTheme();

  
  const pages = ['Lapor Kotor', 'Lapor Acara', 'Buku Panduan'];

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  // data submit form lapor acara
  const [dataAcara, setDataAcara] = useState({
    gedung: '',
    tempat: '',
    tanggalWaktu: '',
    judul: '',
    deskripsi: '',
  });

  // data submit form lapor Kotor
  const [dataLaporKotor, setDataLaporKotor] = useState({
    gedung: '',
    tempat: '',
    tanggalWaktu: '',
    deskripsi: '',
    photo: '',
  });

  // alert
  const [openAlert, setOpenAlert] = useState(false);

  // Lapor acara
  const [openAcara, setOpenAcara] = useState(false);

  // Panduan
  const [openPanduan, setOpenPanduan] = React.useState(false);

  // set gedung lapor kotor
  const [gedungKotor, setGedungKotor] = useState('');

  //	set Tempat lapor kotor
  const [tempatKotor, setTempatKotor] = useState('');

  // set gedung lapor kotor
  const [gedungAcara, setGedungAcara] = useState('');

  //	set Tempat lapor kotor
  const [tempatAcara, setTempatAcara] = useState('');

  // gedung list
  const [gedungList, setGedungList] = useState([]);

  // disable button
  const [disableButton, setDisableButton] = useState(true);

  // image
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [imageURL, setImageURL] = useState('');

  // get data api and allow CORS
  React.useEffect(() => {
    axios
      .get(API_KOORGEDUNG)
      .then((response) => {
        const gedungList = response.data;
        setGedungList(gedungList.data);
        console.log(gedungList);
      })
      .catch((error) => {
        console.log(error);
      });
    listAll(ref(storage, 'laporan/')).then((res) => {
      res.items.forEach((itemRef) => {
        getDownloadURL(itemRef).then((url) => {
          setImageList((prevState) => [...prevState, url]);
        });
      });
    });
  }, []);

  const clientLaporKotor = axios.create({
    baseURL: API_LAPORKOTORINSERT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const clientLaporAcara = axios.create({
    baseURL: API_LAPORACARAINSERT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Lapor Kotor
  const handleClickOpenKotor = () => {
    setOpen(true);
  };

  const handleCloseKotor = () => {
    setOpen(false);
  };
  

  // Lapor Acara
  const handleCloseAcara = () => {
    setOpenAcara(false);
  };
  const handleClickOpenAcara = () => {
    setOpenAcara(true);
  };

  // Panduan
  const handleClickOpenPanduan = () => {
    setOpenPanduan(true);
  };

  const handleClosePanduan = () => {
    setOpenPanduan(false);
  };

  const handleChange = (event, SelectChangeEvent) => {};

  const [value, setValue] = useState();

  // Date & Time
  const [valueTime, setValueTime] = React.useState(dayjs(''));

  // upload file

  const uploadImage = () => {
    setDisableButton(false);
    // jika image kosong dan nama file sama
    if (image === null) {
      alert('Please select an image to upload first');
      return;
    }
    // jika image tidak kosong
    const imageRef = ref(storage, `laporan/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
        console.log('File available at', imageURL);
      });
    });
  };

  // filter code gedung
  const filterGedungCode = gedungList.filter((item, index) => {
    // jika ada value code yang sama maka akan di filter dan hanya akan di tampilkan 1
    // dan jika value null tidak akan di tampilkan
    return gedungList.findIndex((item2) => item2.code === item.code) === index && item.code !== null;
  });

  const filterGedungArea = gedungList.filter((item, index) => {
    // jika ada value clean_area yang sama maka akan di filter dan hanya akan di tampilkan 1
    // dan jika value null tidak akan di tampilkan
    return gedungList.findIndex((item2) => item2.clean_area === item.clean_area) === index && item.clean_area !== null;
  });


  const handleAcaraSubmit = (e) => {
    e.preventDefault();
    const data = {
      gedung: gedungAcara,
      tempat: tempatAcara,
      tanggalWaktu: valueTime,
      judul: dataAcara.judul,
      deskripsi: dataAcara.deskripsi,
    };

    clientLaporAcara
      .post('', {
        code: data.gedung,
        tempat: data.tempat,
        // convert string to timestamp
        date: data.tanggalWaktu,
        time: data.tanggalWaktu,
        title: data.judul,
        description: data.deskripsi,
      })
      .then((response) => {
        console.log('response', response);
        setOpenAlert(true);
        // setelah 3 detik dialog akan tertutup
        setTimeout(() => {
          // refresh page
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKotorSubmit = (e) => {
    e.preventDefault();
    const data = {
      gedung: gedungKotor,
      tempat: tempatKotor,
      deskripsi: dataLaporKotor.deskripsi,
      photo: imageURL,
    };
    console.log('data kotor', data);
    console.log('img url', imageURL);
    // insert data api with axios
    clientLaporKotor
      .post('', {
        code: data.gedung,
        clean_area: data.tempat,
        photo: data.photo,
        deskripsi: data.deskripsi,
      })
      .then((response) => {
        console.log('respons', response);

        // tampilkan alert mui
        setOpenAlert(true);
        // setelah 3 detik dialog akan tertutup
        window.location.reload(false);
        setTimeout(() => {
         
          setOpen(false);
         
          // refresh page
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AppBar sx={{ background: '#063970' }}>
        <Toolbar>
          <Logo>
            <img width={30} height={30} src={logo} alt="logo" />
          </Logo>
          {/* <Typography sx={{ fontSize: '2rem', paddingLeft: '0.3%' }}>Pick A Bin</Typography> */}
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', marginLeft: 30 } }}>
                {pages.map((page) => (
                  // menu navbar font size 16px
                <Link key={page} onClick={
                // es lint disable
                // eslint-disable-next-line no-nested-ternary
                  page === 'Lapor Kotor' ? handleClickOpenKotor : page === 'Lapor Acara' ? handleClickOpenAcara : handleClickOpenPanduan
                  } underline="none" sx={{  fontWeight: 'bold', lineheight: 12 }}>
                  <Button sx={{ fontSize: 14, color: 'white' }}>{page}</Button>
                </Link>
                ))}
              </Box>
              <Button sx={{ marginLeft: 'auto', background: '#47b882'}} variant="contained">
                <Link style={{ color: 'white' }} to="/login">Login</Link> 
              </Button>

              {/* ModalLaporKotor */}
              <Dialog open={open} onClose={handleCloseKotor}>
                {openAlert ? (
                  <Alert severity="success" onClose={() => setOpenAlert(false)}>
                    Data Berhasil Di Simpan
                  </Alert>
                ) : null}

                <DialogTitle>
                  <Typography variant="h4">
                    Laporan Lingkungan Kotor
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Apabila menemukan daerah yang kotor, silahkan laporkan dan unggah bukti tempat tersebut.
                  </DialogContentText>
                  <FormControl sx={{ mb: 1, mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Gedung</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gedungKotor}
                      label="Gedung"
                      onChange={(event) => setGedungKotor(event.target.value)}
                    >
                      {filterGedungCode.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.code}>
                            {item.code}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Tempat</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tempatKotor}
                      label="Gedung"
                      onChange={(event) => setTempatKotor(event.target.value)}
                    >
                      {filterGedungArea.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.clean_area}>
                            {item.clean_area}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Isi Laporan"
                    type="text"
                    fullWidth
                    variant="standard"
                    sx={{ mb: 2 }}
                    value={dataLaporKotor.deskripsi}
                    onChange={(event) => setDataLaporKotor({ ...dataLaporKotor, deskripsi: event.target.value })}
                  />

                  <Box sx={{ p: 2, width: 'auto', border: '2px dashed grey' }} textAlign="center">
                    <IconButton color="primary" aria-label="upload picture" component="label">
                      <input hidden accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])} />
                      {
                        // tampilkan gambar dari imageURL state
                        imageURL ? <img src={imageURL} alt="gambar" width="100%" /> : <PhotoCamera />
                      }
                    </IconButton>
                  </Box>
                  {image != null ? <p>{image.name}</p> : <p>Belum ada gambar</p>}

                  {disableButton ? (
                    <button onClick={uploadImage}>Upload</button>
                  ) : (
                    <button disabled onClick={uploadImage}>
                      Tampilkan
                    </button>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseKotor}>
                    <Typography variant="subtitle1">
                        Cancel
                    </Typography>
                  </Button>
                  <Button onClick={handleKotorSubmit}>
                    <Typography variant="subtitle1">
                      Kirim
                    </Typography>
                  </Button>
                </DialogActions>
              </Dialog>

              {/* // Modal Lapor Acara */}
              <Dialog open={openAcara} onClose={handleCloseAcara}>
                {openAlert ? (
                  <Alert severity="success" onClose={() => setOpenAlert(false)}>
                    Data Berhasil Di Simpan
                  </Alert>
                ) : null}
                <DialogTitle>
                  <Typography variant="h4">
                    Laporan Ada Acara
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Apabila terdapat kegiatan dan membutuhkan petugas kebersihan maka laporkan acara.
                  </DialogContentText>
                  <FormControl sx={{ mb: 1, mt: 2 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Gedung</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gedungAcara}
                      label="Gedung"
                      onChange={(event) => setGedungAcara(event.target.value)}
                    >
                      {filterGedungCode.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.code}>
                            {item.code}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ mb: 1 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Tempat</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tempatAcara}
                      label="Gedung"
                      onChange={(event) => setTempatAcara(event.target.value)}
                    >
                      {filterGedungArea.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.clean_area}>
                            {item.clean_area}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        label="Date & Time"
                        value={valueTime}
                        onChange={(newValue) => {
                          // format datetime to string
                          const date = new Date(newValue);
                          // convert datetime to string YYYY-MM-DD HH:MM:SS
                          const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');

                          setValueTime(timestamp);
                          console.log(timestamp);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="judul"
                    label="Judul"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={dataAcara.judul}
                    onChange={(e) => setDataAcara({ ...dataAcara, judul: e.target.value })}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="isi"
                    label="Isi"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={dataAcara.deskripsi}
                    onChange={(e) => setDataAcara({ ...dataAcara, deskripsi: e.target.value })}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAcara}>
                    <Typography variant="subtitle1">
                        Cancel
                    </Typography>
                  </Button>
                  <Button onClick={handleAcaraSubmit}>
                    <Typography variant="subtitle1">
                      Kirim
                    </Typography>
                  </Button>
                </DialogActions>
              </Dialog>
              
              {/* Panduan */}
              <Dialog
                open={openPanduan}
                onClose={handleClosePanduan}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Buku panduan"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" >
                    <Typography variant="h6">
                     Anda Yakin berpindah halaman untuk membaca buku panduan ? 
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClosePanduan}>
                    <Typography variant="h6">
                      Tidak
                    </Typography>
                  </Button>
                  <Button onClick={handleClosePanduan} sx={{ marginLeft: 'auto', background: '#47b882', color: 'primary' }} variant="contained">
                    <Typography variant="h6">
                      <a style={{ color: 'white' }} href="https://drive.google.com/drive/folders/1BSNwdWtonjwJ6e57CwrU45K1DddafBIs?usp=share_link" target="_blank" rel="noopener noreferrer">Ya</a>
                    </Typography>
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
