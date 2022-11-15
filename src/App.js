import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './styles/GlobalStyle';
// theme
import ThemeProvider from './theme';
// import Routing from './routes';

import Aspirasi from './pages/Aspirasi';
import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';
import Monitor from './pages/Monitor';
import Piket from './pages/Piket';
import DashboardApp from './pages/DashboardApp';

import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import DashboardLayout from './layouts/dashboard';
import LandingPage from './pages/landingpage/landingpage';
import ModalLaporKotor from './pages/landingpage/ModalLaporKotor';


const helmetContext = {};
function App() {
  
  return (
    <ThemeProvider>
      <BaseOptionChartStyle />
      <HelmetProvider context={helmetContext}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route index path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="laporKotor" element={<ModalLaporKotor />} />
            {/* children route */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path='/dashboard' element={<Navigate to='/dashboard/app' replace />} />
              <Route path="app" element={<DashboardApp />} />
              <Route path="user" element={<User />} />
              <Route path="monitor" element={<Monitor />} />
              <Route path="monitor/piket" element={<Piket />} />
              <Route path="aspirasi" element={<Aspirasi />} />
            </Route>
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
