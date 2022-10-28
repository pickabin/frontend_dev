import React from 'react';
import { Button, NoRightPaddingContainer } from '../../styles/Common.style';
import { H1, Para } from '../../styles/Typography.style';
import {
	HeroWrapper,
	HeroContent,
	HeroImage,
	HeroContentWrapper,
} from './Hero.style';
import HeroImg from '../../images/image-mockups.png';

const Hero = () => {
	return (
	<div>
		<NoRightPaddingContainer>
			<HeroWrapper>
				<HeroContent>
					<HeroContentWrapper>
						<H1> <b>Pick A Bin</b></H1>
						<Para>
						Pick A Bin adalah aplikasi monitoring tempat sampah. Aplikasi ini memudahkan warga dan petugas dalam jadwal pengambilan sampah, konfirmasi pengambilan sampah dan memudahkan komunikasi antar user. </Para>
						<Button>Get The App Now</Button>
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
