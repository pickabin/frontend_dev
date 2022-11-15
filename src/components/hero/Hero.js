import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button, NoRightPaddingContainer } from '../../styles/Common.style';
import { H1, Para } from '../../styles/Typography.style';
import {
	HeroWrapper,
	HeroContent,
	HeroImage,
	HeroContentWrapper,
} from './Hero.style';
import HeroImg from '../../images/image-mockups.png';

function Hero() {
	return (
	<div>
		<NoRightPaddingContainer>
			<HeroWrapper>
				<HeroContent>
					<HeroContentWrapper>
						<H1> <b>Pick A Bin</b></H1>
						<Para>
							Pick A Bin adalah aplikasi monitoring dan penjadwalan petugas kebersihan dan koordinator untuk meningkatkan efisiensi kerja petugas kebersihan.</Para>
						<Button>
							<Link to="https://play.google.com/store/apps/details?id=com.pickabin.pickabin_app" style={{ color: 'white' }}>Get The App Now</Link>
						</Button>
					</HeroContentWrapper>
				</HeroContent>
				<HeroImage>
					<img src={HeroImg} alt='hero' style={{ marginTop: 230 }}/>
				</HeroImage>
			</HeroWrapper>
		</NoRightPaddingContainer>
	</div>
	);
};

export default Hero;
