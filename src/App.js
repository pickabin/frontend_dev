import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyle from './styles/GlobalStyle';
// theme
import ThemeProvider from './theme';
// import Routing from './routes';

import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import DashboardLayout from './layouts/dashboard';
import LandingPage from './pages/landingpage/landingpage';

const helmetContext = {};
const App = () => {
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
            {/* children route */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="app" element={<DashboardApp />} />
              <Route path="user" element={<User />} />
              <Route path="products" element={<Products />} />
              <Route path="blog" element={<Blog />} />
            </Route>
           
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
