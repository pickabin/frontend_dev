import React from 'react';
import { ArticleWrapper, ArticleGrid, ArticleCard, ArticleCardContent } from './Articles.style';
import { Container } from '../../styles/Common.style';
import Karina from '../../images/karina.jpg';
import PakGrez from '../../images/pakgrez.jpg';
import MasIrul from '../../images/masirul.jpg';
import BuSiti from '../../images/busiti.jpg';

import { H2, H4, Para } from '../../styles/Typography.style';

const Articles = () => {
  return (
    <div>
      <Container>
        <ArticleWrapper>
          <H2>
            <b>Testimoni</b>
          </H2>
          <ArticleGrid>
            <ArticleCard>
              <img src={Karina} alt="" />
              <ArticleCardContent>
                <H4>
                  <b>Diva - Mahasiswa PENS</b>
                </H4>
                <Para>
                  "Aplikasi ini bermanfaat karena kalau di kampus ada kegiatan dan butuh pengangkutan sampah bisa
                  langsung dilaporkan ke cleaning service agar bisa standby"
                </Para>
              </ArticleCardContent>
            </ArticleCard>
            <ArticleCard>
              <img src={PakGrez} alt="" />
              <ArticleCardContent>
                <H4>
                  <b>Grez - Dosen PENS</b>
                </H4>
                <Para>
                  "Aplikasi ini sangat bermanfaat, karena ketika ada lab atau kelas yang kotor, dari dosen PENS bisa
                  langsung melaporkan sehingga cleaning service bisa langsung membersihkan tempat tersebut"
                </Para>
              </ArticleCardContent>
            </ArticleCard>
            <ArticleCard>
              <img src={MasIrul} alt="" />
              <ArticleCardContent>
                <H4>
                  <b>Irul - Petugas Kebersihan</b>
                </H4>

                <Para>
                  "Dengan menggunakan Aplikasi ini bisa mempermudah pekerjaan saya, karena saya jadi tau mana sampah
                  yang sudah diambil dan mana sampah yang belum diambil"
                </Para>
              </ArticleCardContent>
            </ArticleCard>

            <ArticleCard>
              <img src={BuSiti} alt="" />
              <ArticleCardContent>
                <H4>
                  <b>Siti - Petugas Kebersihan</b>
                </H4>
                <Para>
                  "Karena di PENS masih banyak cleaning service yang melakukan kecurangan, dengan adanya aplikasi ini
                  akan sangat membantu untuk meminimalisir kecurangan tersebut"
                </Para>
              </ArticleCardContent>
            </ArticleCard>
          </ArticleGrid>{' '}
        </ArticleWrapper>
      </Container>
    </div>
  );
};

export default Articles;
