import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Nav, Ul, Li, Logo } from './Header.style';
import logo from '../../images/logo.png';
import { Button} from '../../styles/Common.style';

const Header = () => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
	<div>
			<Navigation>
				<Nav>
					<Logo>
						<img src={logo} alt='logo' />
					</Logo>
					<Ul className={open ? `active` : `navlinks`}>
						<Li>
							<Link to={`#`}>Home</Link>
						</Li>
						<Li>
							<Link to={`#`}>Features</Link>
						</Li>
						<Li>
							<Link to={`#`}>Testimoni</Link>
						</Li>
						<Li>
							<Link to={`#`}>Contact</Link>
						</Li>
						
					</Ul>
					<Button>
							<Link to='/login'>Login</Link>
					</Button>
				
				</Nav>
			</Navigation>
	</div>
	);
};

export default Header;
