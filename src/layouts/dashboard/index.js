import { useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';

import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import AuthUser from '../../sections/auth/login/AuthUser';
import Login from '../../pages/Login';


// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  
  const [open, setOpen] = useState(false);

  const { getToken } = AuthUser();
  console.log("token",getToken());
  if (!getToken()) {
    // window.location.replace('http://localhost:3000/login');
    return <Login />
  }

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      <MainStyle>
        <Outlet />
     
            {/* <Route path="/app" element={<DashboardLayout />} /> */}
      
      </MainStyle>
    </RootStyle>
  );
}
