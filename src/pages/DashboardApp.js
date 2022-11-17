// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import React, { useState } from 'react';


// axios
import axios from "axios";

import { API_PETUGASDISIPLIN, API_JUMLAHPETUGAS, API_STATUSPETUGAS } from '../api/api';

// components
import Page from '../components/Page';
// sections
import {
  AppCurrentVisits,
  AppWidgetSummary,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();

  const [petugasDisiplin, setPetugasDisiplin] = useState([]);
  const [namaPetugas, setNamaPetugas] = useState([]);
  const [jumlahPetugas, setJumlahPetugas] = useState([]);
  const [jumlahPiket, setJumlahPiket] = useState([]);

  React.useEffect(() => {
    axios.get(API_JUMLAHPETUGAS).then((res) => {
       const jumlahPetugas = res.data;
        setJumlahPetugas(jumlahPetugas.data);
    }).catch((error) => {
      console.log(error);
    });

    axios.get(API_STATUSPETUGAS).then((res) => {
      const jumlahPiket = res.data;
      setJumlahPiket(jumlahPiket.data);
    }).catch((error) => {
      console.log(error);
    });
  
    axios
      .get(API_PETUGASDISIPLIN)
      .then((res) => {
        const petugasDisiplin = res.data;
        setPetugasDisiplin(petugasDisiplin.data);
        console.log("petugasDisiplin", petugasDisiplin);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const PETUGASDISIPLINLIST = petugasDisiplin.map((item) => {
    console.log("item", item.petugas.user.name);
    console.log("total", item.total);
    return { nama: item.petugas.user.name, total: parseInt(item.total,10) };
  })

  Object.keys(jumlahPetugas).map((item) => {
    console.log("item data", item);
    console.log("total", jumlahPetugas[item]);
    return { nama: item};
  })

   // ambil object done
   const DATAPIKET_TOTAL = Object.keys(jumlahPiket).map((item) => {
    // tampilkan data nama object
    console.log("item data done", Object.keys(jumlahPiket[item]));
    console.log("total done", jumlahPiket[item]);
    return { total: jumlahPiket[item]};
   })


  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          {
            Object.keys(jumlahPetugas).map((item) => {
              // console.log("item data", item);
              // console.log("total", jumlahPetugas[item]);
              return (
                <Grid item xs={12} sm={6} md={3} lg={4} key={item}>
                  <AppWidgetSummary
                    title={item}
                    value={jumlahPetugas[item]}
                    total={jumlahPetugas[item]}
                    percentage={0}
                    icon={'ant-design:user-outlined'}
                    trend={0}
                    color={
                      // eslint-disable-next-line no-nested-ternary
                      item === 'D4PENS' ? "info" : item === 'PSPENS' ? "success" : item === 'D3PENS' ? "warning" : "error"
                    }
                  />
                </Grid>
              );
            })
          }
          <Grid item xs={12} sm={6} md={3} lg={4}>
            {
              DATAPIKET_TOTAL.length > 0 ? (
                <AppCurrentVisits
                title="Persentase yang piket hari ini"
                chartData={[
                  { label: "D4PENS", value: DATAPIKET_TOTAL[0].total.D4PENS},
                  { label: "PSPENS", value: DATAPIKET_TOTAL[0].total.PSPENS},
                  { label: "D3PENS", value: DATAPIKET_TOTAL[0].total.D3PENS},
                ]}
                chartColors={[
                  theme.palette.primary.main,
                  theme.palette.chart.red[0],
                  theme.palette.chart.violet[0],
                  theme.palette.chart.yellow[0],
                ]}
              />
              ) : (
                <div>Loading...</div>
              )
            }
          </Grid>

          <Grid item xs={12}sm={6} md={3} lg={4}>
           {
             // jika petugas disiplin list tidak kosong maka tampilkan
              PETUGASDISIPLINLIST.length > 0 ? (
                <AppConversionRates
                title="Petugas Terdisiplin"
                subheader="Petugas yang paling banyak menyelesaikan pekerjaan perbulan"
                chartData={[
                  // ambil dari PETUGASDISIPLINLIST
                  {label: PETUGASDISIPLINLIST[0].nama, value: PETUGASDISIPLINLIST[0].total},
                  {label: PETUGASDISIPLINLIST[1].nama, value: PETUGASDISIPLINLIST[1].total},
                  {label: PETUGASDISIPLINLIST[2].nama, value: PETUGASDISIPLINLIST[2].total},
                  {label: PETUGASDISIPLINLIST[3].nama, value: PETUGASDISIPLINLIST[3].total},
                  {label: PETUGASDISIPLINLIST[4].nama, value: PETUGASDISIPLINLIST[4].total},
                 ]
                }
              />
              ) : (
                <div>loading</div>
              )
           } 
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
