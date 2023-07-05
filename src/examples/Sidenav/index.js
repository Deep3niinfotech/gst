import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import DvrTwoToneIcon from '@mui/icons-material/DvrTwoTone';
import Inventory2TwoToneIcon from '@mui/icons-material/Inventory2TwoTone';
import ListAltTwoToneIcon from '@mui/icons-material/ListAltTwoTone';
import ContentPasteGoTwoToneIcon from '@mui/icons-material/ContentPasteGoTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import ArgonBox from '../../components/ArgonBox';
import ArgonTypography from '../../components/ArgonTypography';
import { useArgonController, setMiniSidenav } from '../../context';
import SidenavRoot from './SidenavRoot';
import Logout_modal from '../../components/Modal/Logout_modal';
import { UserAuthContextProvider } from '../../context/UserAuthContext';

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar';

const themes = {
  light: {
    sidebar: {
      backgroundColor: '#ffffff',
      color: '#607489',
    },
    menu: {
      menuContent: '#fbfcfd',
      icon: '#0098e5',
      hover: {
        backgroundColor: '#c5e4ff',
        color: '#44596e',
      },
      disabled: {
        color: '#9fb6cf',
      },
    },
  },
};

const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

function Sidenav({ color, brand, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkSidenav, layout } = controller;
  const [modalOpen1, setModalOpen1] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [theme, setTheme] = useState('light');

  const Navigate = useNavigate();
  const handleLogout = () => {
    Navigate('/authentication/logout');
  };
  const location = useLocation();

  // modal
  const toggleModal1 = () => {
    setModalOpen1(!modalOpen1);
  };

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1400);
    }

    function handleResize() {
      handleMiniSidenav();
    }

    handleMiniSidenav();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, setMiniSidenav]);

  // sidebar styles
  const menuItemStyles = {
    root: {
      fontSize: '14px',
      fontWeight: 400,
    },
    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : 'transparent',
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
      '&:hover': {
        backgroundColor: hexToRgba(
          themes[theme].menu.hover.backgroundColor,
          hasImage ? 0.8 : 1
        ),
        color: themes[theme].menu.hover.color,
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const active = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <SidenavRoot
        {...rest}
        variant="permanent"
        ownerState={{ darkSidenav, miniSidenav, layout }}
        className={`sidebar ${miniSidenav ? 'sidebar_close' : 'sidebar_open'}`}
      >
        <ArgonBox pt={3} pb={1} mx="auto" textAlign="center">
          <ArgonBox
            component={NavLink}
            to="/dashboard"
            display="flex"
            alignItems="center"
          >
            {brand && (
              <ArgonBox
                component="img"
                src={brand}
                alt="Argon Logo"
                width="2rem"
                className="sidebar_logo"
              />
            )}
            <ArgonTypography
              ml={2}
              className={`sidebar_logo_text ${miniSidenav ? 'hidden' : ''}`}
            >
              3niinfotech
            </ArgonTypography>
          </ArgonBox>
        </ArgonBox>
        <Divider />
        <div style={{ display: 'flex', height: '100%' }}>
          <Sidebar
            onBackdropClick={() => setMiniSidenav(dispatch, true)}
            backgroundColor={hexToRgba(
              themes[theme].sidebar.backgroundColor,
              hasImage ? 0.9 : 1
            )}
            rootStyles={{
              color: themes[theme].sidebar.color,
            }}
            width={'230px'}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ flex: 1, marginBottom: '32px' }}>
                <Menu
                  menuItemStyles={menuItemStyles}
                  className="sidebar_menu_con"
                >
                  <MenuItem
                    icon={<DvrTwoToneIcon color="dark" fontSize="small" />}
                    component={<Link to="/dashboard" />}
                    className="sidebar_menu"
                    style={{
                      backgroundColor: active('/dashboard') ? '#c5e4ff' : '',
                    }}
                  >
                    Dashboard
                  </MenuItem>

                  <SubMenu
                    label="Master"
                    icon={
                      <ContentPasteGoTwoToneIcon
                        color="dark"
                        fontSize="small"
                      />
                    }
                    className="sidebar_menu"
                    style={{
                      transition: 'all 0.3s ease',
                      backgroundColor:
                        active('/master/company') || active('/master/party')
                          ? '#c5e4ff'
                          : '',
                    }}
                  >
                    <MenuItem
                      icon={
                        <MyLocationTwoToneIcon fontSize="small" color="dark" />
                      }
                      component={<Link to="/master/company" />}
                      style={{
                        backgroundColor: active('/master/company')
                          ? '#c5e4ff'
                          : '',
                        display: miniSidenav ? 'none' : 'flex',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Company
                    </MenuItem>
                    <MenuItem
                      icon={
                        <AccountBoxTwoToneIcon fontSize="small" color="dark" />
                      }
                      component={<Link to="/master/party" />}
                      style={{
                        backgroundColor: active('/master/party')
                          ? '#c5e4ff'
                          : '',
                        display: miniSidenav ? 'none' : 'flex',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Party
                    </MenuItem>
                  </SubMenu>

                  <SubMenu
                    label="Sales"
                    icon={
                      <Inventory2TwoToneIcon color="dark" fontSize="small" />
                    }
                    className="sidebar_menu"
                    style={{
                      transition: 'all 0.3s ease',
                      backgroundColor:
                        active('/sales/sales-data') ||
                        active('/sales/sales-invoice')
                          ? '#c5e4ff'
                          : '',
                    }}
                  >
                    <MenuItem
                      icon={
                        <ListAltTwoToneIcon fontSize="small" color="dark" />
                      }
                      component={<Link to="/sales/sales-data" />}
                      style={{
                        backgroundColor: active('/sales/sales-data')
                          ? '#c5e4ff'
                          : '',
                        display: miniSidenav ? 'none' : 'flex',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sales Data
                    </MenuItem>
                    <MenuItem
                      icon={
                        <FactCheckTwoToneIcon fontSize="small" color="dark" />
                      }
                      component={<Link to="/sales/sales-invoice" />}
                      style={{
                        backgroundColor: active('/sales/sales-invoice')
                          ? '#c5e4ff'
                          : '',
                        display: miniSidenav ? 'none' : 'flex',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Sales Invoice
                    </MenuItem>
                  </SubMenu>

                  <MenuItem
                    icon={
                      <AssignmentIndTwoToneIcon color="dark" fontSize="small" />
                    }
                    component={<Link to="/tables" />}
                    className="sidebar_menu"
                    style={{
                      backgroundColor: active('/tables') ? '#c5e4ff' : '',
                    }}
                  >
                    Table
                  </MenuItem>

                  <MenuItem
                    icon={
                      <AssignmentIndTwoToneIcon color="dark" fontSize="small" />
                    }
                    component={<Link to="/billing" />}
                    className="sidebar_menu"
                    style={{
                      backgroundColor: active('/billing') ? '#c5e4ff' : '',
                    }}
                  >
                    Billing
                  </MenuItem>

                  <MenuItem
                    icon={
                      <AssignmentIndTwoToneIcon color="dark" fontSize="small" />
                    }
                    component={<Link to="/profile" />}
                    className="sidebar_menu"
                    style={{
                      backgroundColor: active('/profile') ? '#c5e4ff' : '',
                    }}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem
                    icon={
                      <ExitToAppTwoToneIcon color="dark" fontSize="small" />
                    }
                    to="#"
                    className="sidebar_menu logout_link"
                    onClick={toggleModal1}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Sidebar>
        </div>
      </SidenavRoot>
      <UserAuthContextProvider>
        <Logout_modal toggleModal1={toggleModal1} modalOpen1={modalOpen1} />
      </UserAuthContextProvider>
    </>
  );
}

Sidenav.defaultProps = {
  color: 'info',
  brand: '',
};

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
  ]),
  brand: PropTypes.string,
};

export default Sidenav;
