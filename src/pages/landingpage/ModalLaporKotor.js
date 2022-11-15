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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button} from '../../styles/Common.style';


const Header = () => {
	const [open, setOpen] = useState(false);

	// const handleClick = () => {
	// 	setOpen(!open);
	// };
	const handleClickOpenKotor = () => {
		setOpen(true);
	};

	const handleCloseKotor = () => {
		setOpen(false);
	};

	const [gedung, setGedung] = React.useState('');

	const handleChangeKotor = (event, SelectChangeEvent) => {
		setGedung(event.target.value);
	};

	const handleChange = (event, SelectChangeEvent) => {
		setGedung(event.target.value);
	};

	return (
	<div>
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
						label="Isi"
						type="text"
						fullWidth
						variant="standard"
					/>
					
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseKotor}>Cancel</Button>
					<Button onClick={handleCloseKotor}>Kirim</Button>
				</DialogActions>
      </Dialog>
	</div>
	);
};

export default Header;
