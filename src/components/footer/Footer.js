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
							<Link to='/about'>About</Link>
							<Link to='/Contact'>Contact</Link> <Link to='/blog'>Blog</Link>
						</div>
						<div className='link'>
							<Link to='/Support'>Support</Link>
							<Link to='/Help'>Help</Link> <Link to='/contact'>Contact</Link>
						</div>
					</FooterLinks>
					<FooterButton>
						<Button>Get The App Now</Button>
					</FooterButton>{' '}
				</div>
			</Container>
		</FooterWrapper>
	</div>
	);
};

export default Footer;
