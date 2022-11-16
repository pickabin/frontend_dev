import React from 'react';
import { Link } from 'react-router-dom';
import { FooterButton, FooterLinks, FooterWrapper } from './Footer.style';
import logo from '../../images/logo2.png';
import iconFb from '../../images/icon-facebook.svg';
import iconTwitter from '../../images/icon-twitter.svg';
import iconYoutube from '../../images/icon-youtube.svg';
import iconPinterest from '../../images/icon-pinterest.svg';
import { Button, Container } from '../../styles/Common.style';

const Footer = () => {
	return (
	<div>
		<FooterWrapper>
			<Container>
				<div className='footer_inner'>
					<FooterLinks>
						<div className='footer-top'>
							<div className='logo'>
								<img src={logo} alt='' />
							</div>
							<div className='social-icons'>
								<img src={iconFb} alt='' />
								<img src={iconTwitter} alt='' />
								<img src={iconYoutube} alt='' />
								<img src={iconPinterest} alt='' />
							</div>
						</div>
						<div className='link'>
							<Link >Laporan</Link>
							<Link >Kebersihan</Link> 
							<Link >Petugas</Link>
						</div>
						<div className='link'>
							<Link >Lingkungan</Link>
							<Link >Pengaduan</Link> 
							<Link >Kotor</Link>
						</div>
					</FooterLinks>
					<FooterButton>
						<Button>
						<a href="https://play.google.com/store/apps/details?id=com.pickabin.pickabin_app" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>Get App Now</a>
						</Button>
					</FooterButton>{' '}
				</div>
			</Container>
		</FooterWrapper>
	</div>
	);
};

export default Footer;
