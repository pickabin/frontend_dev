// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import React, { useState } from 'react';


// axios
import axios from "axios";

import { API_PETUGASDISIPLIN } from '../api/api';

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

  React.useEffect(() => {
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

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Petugas D3" total={10} color="error" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Petugas D4" total={13} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Petugas Paska Sarjana" total={12} color="warning" icon={'aant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Persentase yang piket hari ini"
              chartData={[
                { label: 'D3', value: 4344 },
                { label: 'D4', value: 5435 },
                { label: 'Paska Sarjana', value: 1443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.red[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Petugas Terdisiplin"
              subheader="Petugas yang paling banyak menyelesaikan pekerjaan perbulan"
              chartData={[
                { label: 'Petugas 1', value: 20 },
                { label: 'Petugas 4', value: 20 },
                { label: 'Petugas 5', value: 19 },
                { label: 'Petugas 7', value: 18 },
                { label: 'Petugas 6', value: 18 },
                { label: 'Petugas 9', value: 17 },
                { label: 'Petugas 8', value: 17 },
                { label: 'Petugas 2', value: 16 },
                { label: 'Petugas 10', value: 15 },
                { label: 'Petugas 3', value: 15 },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
