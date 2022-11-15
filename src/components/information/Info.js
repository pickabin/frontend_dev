import React from 'react';
import { Container } from '../../styles/Common.style';
import { H2, H3, Para } from '../../styles/Typography.style';
import { InfoCard, InfoGrid, InfoHeader, InfoWrapper } from './Info.style';
import JadwalPengambilan from '../../images/fitur1.png';
import BudgetingIcomn from '../../images/fitur2.png';
import Onboarding from '../../images/fitur3.png';
import Maps from '../../images/fitur4.png';

const Info = () => {
	return (
	<div>
		<InfoWrapper>
			<Container>
				<InfoHeader style={{ marginBottom:2 }}>
					<center><H2><b>Our Features</b></H2></center>
				</InfoHeader>
				<InfoGrid>
					<InfoCard>
						<center>
							<img src={JadwalPengambilan} alt='' width={200} height={200} style={{maxWidth:200}}/>
							<H3>Monitoring</H3>
							<Para>
								Fitur ini digunakan untuk memberikan informasi kepada koordinator terkait dengan jadwal piket petugas kebersihan 
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={BudgetingIcomn} alt=''  width={200} height={200} style={{maxWidth:200}}/>
							<H3>Penjadwalan</H3>
							<Para>
							Fitur ini digunakan untuk membantu petugas keberihan untuk piket dan memberikan konfirmasi terkait tempat yang sudah dibersihkan
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={Onboarding} alt=''  width={200} height={200} style={{maxWidth:200}}/>
							<H3>Lapor Kotor</H3>
							<Para>
							Fitur ini digunakan untuk masyarakat PENS melaporkan tempat kotor atau tempat yang perlu dibersihkan dilingkungan PENS 
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={Maps} alt=''  width={200} height={200} style={{maxWidth:200}}/>
							<H3>Lapor Acara</H3>
							<Para>
								Fitur ini digunakan untuk mengetahui lokasi dari warga yang dibutuhkan untuk keperluan pengambilan sampah
							</Para>
						</center>
					</InfoCard>
				</InfoGrid>
			</Container>
		</InfoWrapper>
	</div>
	);
};

export default Info;
