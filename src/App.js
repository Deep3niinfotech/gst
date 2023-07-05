import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './layouts/dashboard';
import Tables from './layouts/tables';
import Profile from './layouts/profile';
import Billing from './layouts/billing';
import SignIn from './layouts/authentication/sign-in';
import SignUp from './layouts/authentication/sign-up';
import Logout from './layouts/authentication/Logout';
import Party from './layouts/Master/Party/Party';
import Company from './layouts/Master/Company/Company';
import SalesData from './layouts/Sale/salesData/SalesData';
import SalesInvoice from './layouts/Sale/SalesInvoice';
import { UserAuthContextProvider } from './context/UserAuthContext';
import PrivateRoute from './components/PrivateRoute';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Argon Dashboard 2 MUI example components
import Sidenav from 'examples/Sidenav';

// Argon Dashboard 2 MUI themes
import theme from 'assets/theme';
import themeDark from 'assets/theme-dark';

// Argon Dashboard 2 MUI contexts
import { useArgonController, setMiniSidenav } from 'context';

// Images
import brand from 'assets/images/logo-ct.png';
// Icon Fonts
import 'assets/css/nucleo-icons.css';
import 'assets/css/nucleo-svg.css';
import ForgetPassword from 'layouts/authentication/ForgetPassword';
import ProfilePage from 'layouts/profile/ProfilePgae';

export default function App() {
  const [controller, dispatch] = useArgonController();
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { miniSidenav, direction, layout, sidenavColor, darkMode } = controller;

  const isAuthenticated = localStorage.getItem('isAuthenticated1');

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      // setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  return (
    <div className="main_page_div">
      <ThemeProvider theme={darkMode ? themeDark : theme}>
        <CssBaseline />
        {layout === 'dashboard' && isAuthenticated && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              onMouseLeave={handleOnMouseLeave}
              onClick={handleOnMouseEnter}
            />
          </>
        )}
        <UserAuthContextProvider>
          <Routes>
            <Route path="/authentication/sign-in" element={<SignIn />} />
            <Route path="/authentication/sign-up" element={<SignUp />} />
            <Route
              path="/authentication/reset-password"
              element={<ForgetPassword />}
            />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} exact />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="master/company" element={<Company />} />
              <Route path="master/party" element={<Party />} />
              <Route path="sales/sales-data" element={<SalesData />} />
              <Route path="sales/sales-invoice" element={<SalesInvoice />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/authentication/logout" element={<Logout />} />
            </Route>
          </Routes>
        </UserAuthContextProvider>
      </ThemeProvider>
    </div>
  );
}
