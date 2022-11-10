import React, { useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
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
import { Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// Date & Time
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import { te } from 'date-fns/locale';

// firebase
import { ref, uploadBytes, listAll,getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';

// import API_KOORGEDUNG
import { API_KOORGEDUNG, API_LAPORKOTORINSERT, API_LAPORACARAINSERT } from '../../api/api';

import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import logo from '../../images/logo.png';
import { Button} from '../../styles/Common.style';
import { storage } from '../../firebase';




const Header = () => {
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
		photo : '',
	});

	// alert 
	const [openAlert, setOpenAlert] = useState(false);

	// Lapor acara
	const [open2, setOpen2] = useState(false);

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
	

	// get data api
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

	// const handleChangeKotor = (event, SelectChangeEvent) => {
	// 	setGedung(event.target.value);
	// };

	// Lapor Acara
	const handleCloseAcara = () => {
		setOpen2(false);
	};
	const handleClickOpenAcara = () => {
		setOpen2(true);
	};

	const handleChange = (event, SelectChangeEvent) => {
		
	};

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
				console.log("File available at", imageURL);
			});
		})
	};
	  
	 
	  
	  // filter code gedung
	  const filterGedungCode = gedungList.filter((item, index) => {
		// jika ada value code yang sama maka akan di filter dan hanya akan di tampilkan 1
		// dan jika value null tidak akan di tampilkan
		return (
				gedungList.findIndex((item2) => item2.code === item.code) === index && item.code !== null
		);

	  });

	  const  filterGedungArea = gedungList.filter((item, index) => {
		// jika ada value clean_area yang sama maka akan di filter dan hanya akan di tampilkan 1
		// dan jika value null tidak akan di tampilkan
		return (
				gedungList.findIndex((item2) => item2.clean_area === item.clean_area) === index && item.clean_area !== null
		);
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
		// console.log("data code",  data.gedung);
		// console.log("data clean area",  data.tempat);
		// console.log("data tanggal",  data.tanggalWaktu);
		// console.log("data judul",  data.judul);
		// console.log("data deskripsi",  data.deskripsi);
		// insert data api with axios
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
				console.log("response", response);
				setOpenAlert(true);
				// setelah 3 detik dialog akan tertutup
				setTimeout(() => {
					setOpen2(false);
				}, 3000);
				
			  }
			)
			.catch((error) => {
				console.log(error);
			}
	    );
	}

	const handleKotorSubmit = (e) => {
		e.preventDefault();
		const data = {
			gedung: gedungKotor,
			tempat: tempatKotor,
			deskripsi : dataLaporKotor.deskripsi,
			photo : imageURL
		};
		console.log("data kotor", data);
		console.log("image url", imageURL);
		// insert data api with axios
		clientLaporKotor
			.post('', {
				code: data.gedung,
				clean_area: data.tempat,
				photo: data.photo,
				deskripsi: data.deskripsi,
			})
			.then((response) => {
				console.log("response", response);
				
				// tampilkan alert mui
				setOpenAlert(true);
				// setelah 3 detik dialog akan tertutup
				setTimeout(() => {
					setOpen(false);
				}
				, 3000);
			})
			.catch((error) => {
				console.log(error);
			}
		);
	    
	}



	return (
		<div>
			<Navigation fullWidth>
				<Nav>
					<Logo>
						<img src={logo} alt='logo' />
					</Logo>
					<Ul className={open ? 'active' : 'navlinks'}>
						<Li>
							<Link  onClick={handleClickOpenKotor}>Lapor Kotor</Link>
						</Li>
						<Li>
							<Link  onClick={handleClickOpenAcara}>Lapor Acara</Link>
						</Li>
						<Li>
							<Link >Buku Panduan</Link>
						</Li>
					</Ul>
					<Button>
							<Link to='/login'>Login</Link>
					</Button>
				
				</Nav>
			</Navigation>

			 {/* ModalLaporKotor */}
			<Dialog open={open} onClose={handleCloseKotor}>
			     {
					openAlert ? (
						<Alert severity="success" onClose={() => setOpenAlert(false)}>Data Berhasil Di Simpan</Alert>
					) : null
				 }
				
				<DialogTitle>Laporan Lingkungan Kotor</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Apabila menemukan daerah yang kotor, silahkan laporkan dan unggah bukti tempat tersebut.
					</DialogContentText>
					<FormControl sx={{ mb: 1, mt: 2}} fullWidth>
						<InputLabel id="demo-simple-select-label">Gedung</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={gedungKotor}
							label="Gedung"
							onChange={event => setGedungKotor(event.target.value)}
						>
							{
								filterGedungCode.map((item) => {
									return (
										<MenuItem key={item.id} value={item.code}>{item.code}</MenuItem>
									)
								})
							}
						</Select>
					</FormControl>
					<FormControl sx={{ mb: 1}} fullWidth>
						<InputLabel id="demo-simple-select-label">Tempat</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={tempatKotor}
							label="Gedung"
							onChange={event => setTempatKotor(event.target.value)}
						>
							{
								filterGedungArea.map((item) => {
									return (
										<MenuItem key={item.id} value={item.clean_area}>{item.clean_area}</MenuItem>
									)
								})
							}
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
						sx={{ mb: 2}}
						value={dataLaporKotor.deskripsi}
						onChange={event => setDataLaporKotor({...dataLaporKotor, deskripsi: event.target.value})}
					/>
										

					<Box sx={{ p: 2, width: 'auto' , border: '2px dashed grey'}} textAlign='center'>
						<IconButton color="primary" aria-label="upload picture" component="label"  >
							<input hidden accept="image/*" type="file" 
							onChange={(e) => 
								setImage(e.target.files[0]) } 
							/>
							{
								// tampilkan gambar dari imageURL state
								imageURL ? <img src={imageURL} alt="gambar" width="100%" /> : <PhotoCamera />
							}							
						</IconButton>
						
					</Box>
					{
						image != null ? (
							<p>{image.name}</p>
						) : (
							<p>Belum ada gambar</p>
						)
					}
					
					{
						disableButton ? (
							<button onClick={uploadImage} >Upload</button>
						) : (
							<button disabled onClick={uploadImage} >Tampilkan</button>
						)
					}
					
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseKotor}>Cancel</Button>
					<Button onClick={handleKotorSubmit}>Kirim</Button>
				</DialogActions>
      		</Dialog>

			{/* // Modal Lapor Acara */}
			<Dialog open={open2} onClose={handleCloseAcara}>
			    {
					openAlert ? (
						<Alert severity="success" onClose={() => setOpenAlert(false)}>Data Berhasil Di Simpan</Alert>
					) : null
				 }
				<DialogTitle>Laporan Ada Acara</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Apabila terdapat kegiatan dan membutuhkan petugas kebersihan maka laporkan acara.
					</DialogContentText>
					<FormControl sx={{ mb: 1, mt: 2}} fullWidth>
							<InputLabel id="demo-simple-select-label">Gedung</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={gedungAcara}
								label="Gedung"
								onChange={event => setGedungAcara(event.target.value)}
							>
								{
									filterGedungCode.map((item) => {
										return (
											<MenuItem key={item.id} value={item.code}>{item.code}</MenuItem>
										)
									})
								}
							</Select>
						</FormControl>
						<FormControl sx={{ mb: 1}} fullWidth>
							<InputLabel id="demo-simple-select-label">Tempat</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={tempatAcara}
								label="Gedung"
								onChange={event => setTempatAcara(event.target.value)}
							>
								{
									filterGedungArea.map((item) => {
										return (
											<MenuItem key={item.id} value={item.clean_area}>{item.clean_area}</MenuItem>
										)
									})
								}
							</Select>
						</FormControl>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Stack spacing={3}>
								<DateTimePicker
								label="Date & Time"
								value={valueTime}
								onChange={
									(newValue) => {
										// format datetime to string
										const date = new Date(newValue);
										// convert datetime to string YYYY-MM-DD HH:MM:SS
										const timestamp = date.toISOString().slice(0, 19).replace('T', ' ');
										
										setValueTime(timestamp);
										console.log(timestamp);
									
									}
								}
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
							value={ dataAcara.judul }
							onChange={ (e) => setDataAcara({...dataAcara, judul: e.target.value}) }
						/>
						<TextField
							autoFocus
							margin="dense"
							id="isi"
							label="Isi"
							type="text"
							fullWidth
							variant="standard"
							value={ dataAcara.deskripsi }
							onChange={ (e) => setDataAcara({...dataAcara, deskripsi: e.target.value}) }
						/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAcara}>Cancel</Button>
					<Button onClick={handleAcaraSubmit}>Kirim</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Header;
