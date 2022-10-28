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
				<InfoHeader style={{ marginBottom:30 }}>
					<center><H2><b>Our Features</b></H2></center>
				</InfoHeader>
				<InfoGrid>
					<InfoCard>
						<center>
							<img src={JadwalPengambilan} alt='' width={200} height={400} style={{maxWidth:200}}/>
							<H3>Jadwal Pengambilan Sampah</H3>
							<Para>
							Fitur ini digunakan untuk memberikan info jadwal terkait pengambilan sampah yang telah ditentukan warga pada saat registrasi
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={BudgetingIcomn} alt=''  width={200} height={400} style={{maxWidth:200}}/>
							<H3> Konfirmasi Pengambilan Sampah</H3>
							<Para>
							Fitur ini digunakan untuk membantu petugas dalam melakukan konfirmasi terkait sampah yang sudah diambil
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={Onboarding} alt=''  width={200} height={400} style={{maxWidth:200}}/>
							<H3> Aktivitas Pengambilan Sampah</H3>
							<Para>
							Fitur ini digunakan untuk membantu petugas maupun warga dalam memonitoring pengambilan sampah
							</Para>
						</center>
					</InfoCard>
					<InfoCard>
						<center>
							<img src={Maps} alt=''  width={200} height={400} style={{maxWidth:200}}/>
							<H3> Maps</H3>
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
