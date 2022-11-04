import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// Date & Time
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';

import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import logo from '../../images/logo.png';
import { Button} from '../../styles/Common.style';


const Header = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};

	// Lapor acara
	const [open2, setOpen2] = useState(false);

	// set gedung
	const [gedung, setGedung] = React.useState('');

	// Lapor Kotor
	const handleClickOpenKotor = () => {
		setOpen(true);
	};

	const handleCloseKotor = () => {
		setOpen(false);
	};

	const handleChangeKotor = (event, SelectChangeEvent) => {
		setGedung(event.target.value);
	};

	// Lapor Acara
	const handleCloseAcara = () => {
		setOpen2(false);
	};
	const handleClickOpenAcara = () => {
		setOpen2(true);
	};

	const handleChange = (event, SelectChangeEvent) => {
		setGedung(event.target.value);
	};

	// Date & Time
	const [value, setValue] = React.useState(dayjs(''));

	const handleChangeTime = (newValue) => {
	  setValue(newValue);
	};

	// upload file
	const handleFileUploadError = (error) => {
		// Do something...
	  }
	  
	  const handleFilesChange = (files) => {
		// Do something...
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
				<DialogTitle>Laporan Lingkungan Kotor</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Apabila menemukan daerah yang kotor, silahkan laporkan dan unggah bukti tempat tersebut.
					</DialogContentText>
					<FormControl sx={{ mb: 1}} fullWidth>
						<InputLabel id="demo-simple-select-label">Gedung</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={gedung}
							label="Gedung"
							onChange={handleChange}
						>
							<MenuItem value={'D3'}>D3</MenuItem>
							<MenuItem value={'D4'}>D4</MenuItem>
							<MenuItem value={'PS'}>PS</MenuItem>
						</Select>
					</FormControl>
					<FormControl sx={{ mb: 1}} fullWidth>
						<InputLabel id="demo-simple-select-label">Tempat</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={gedung}
							label="Gedung"
							onChange={handleChange}
						>
							<MenuItem value={'LT2IT'}>LT2IT</MenuItem>
							<MenuItem value={'LT1SPE'}>LT1SPE</MenuItem>
							<MenuItem value={'LT3ELIN'}>LT3ELIN</MenuItem>
						</Select>
					</FormControl>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Isi Acara"
						type="text"
						fullWidth
						variant="standard"
						sx={{ mb: 2}}
					/>

					<Box sx={{ p: 2, width: 'auto' , border: '2px dashed grey'}} textAlign='center'>
						<IconButton color="primary" aria-label="upload picture" component="label" >
							<input hidden accept="image/*" type="file" />
							<PhotoCamera />
						</IconButton>
					</Box>
					
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseKotor}>Cancel</Button>
					<Button onClick={handleCloseKotor}>Kirim</Button>
				</DialogActions>
      		</Dialog>

			{/* // Modal Lapor Acara */}
			<Dialog open={open2} onClose2={handleCloseAcara}>
				<DialogTitle>Laporan Ada Acara</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Apabila terdapat kegiatan dan membutuhkan petugas kebersihan maka laporkan acara.
					</DialogContentText>
					<FormControl sx={{ mb: 1}} fullWidth>
							<InputLabel id="demo-simple-select-label">Gedung</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={gedung}
								label="Gedung"
								onChange={handleChange}
							>
								<MenuItem value={'D3'}>D3</MenuItem>
								<MenuItem value={'D4'}>D4</MenuItem>
								<MenuItem value={'PS'}>PS</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ mb: 1}} fullWidth>
							<InputLabel id="demo-simple-select-label">Tempat</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={gedung}
								label="Gedung"
								onChange={handleChange}
							>
								<MenuItem value={'LT2IT'}>LT2IT</MenuItem>
								<MenuItem value={'LT1SPE'}>LT1SPE</MenuItem>
								<MenuItem value={'LT3ELIN'}>LT3ELIN</MenuItem>
							</Select>
						</FormControl>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<Stack spacing={3}>
								<DateTimePicker
								label="Date & Time"
								value={value}
								onChange={handleChangeTime}
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
						/>
						<TextField
							autoFocus
							margin="dense"
							id="isi"
							label="Isi"
							type="text"
							fullWidth
							variant="standard"
						/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseAcara}>Cancel</Button>
					<Button onClick={handleCloseAcara}>Kirim</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default Header;
