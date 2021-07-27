import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Drawer, useTheme } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuthenticationContext } from 'context/AuthenticationContext';

import LockIcon from "../../assets/tab-lock.png";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      background: theme.colors.secondary,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    logoWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderBottom: `1px solid ${theme.colors.inputBorder}`,
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    listItemText: {
      marginLeft: 16,
      marginRight: 16,
    },
    listItem: {
      marginLeft: 0,
      marginRight: 0,
      color: theme.colors.white,
      paddingRight: 40,
    },
    active: {
      background: theme.colors.secondary,
      borderRight: `3px solid ${theme.colors.primary}`,
    },
    icon: {
      height: 32,
      width: 30,
    },
    avatarRoot: {
      minWidth: 30,
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: 10,
    },
    list: {
      marginTop: 10,
    },
    lockIcon: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      right: '20px',
    }
  }),
);
const Categories = [
  {
    key: 'dashboard',
    label: 'SIDENAV_DASHBOARD',
    route: '/dashboard',
    activeIcon: require('assets/tab-home-active.png'),
    inactiveIcon: require('assets/tab-home-inactive.png'),
    isProtected: false,
  },
  {
    key: 'wallet',
    label: 'SIDENAV_WALLET',
    route: '/wallet',
    activeIcon: require('assets/tab-wallet-active.png'),
    inactiveIcon: require('assets/tab-wallet-inactive.png'),
    isProtected: true,
  },
  {
    key: 'gateway',
    label: 'SIDENAV_FIAT_GATEWAY',
    route: '/fiat-gateway',
    activeIcon: require('assets/tab-fiat-active.png'),
    inactiveIcon: require('assets/tab-fiat-inactive.png'),
    isProtected: true,
  },
  {
    key: 'dex',
    label: 'SIDENAV_DEX',
    route: '/dex',
    activeIcon: require('assets/tab-dex-active.png'),
    inactiveIcon: require('assets/tab-dex-inactive.png'),
    isProtected: true,
  },
  {
    key: 'fark',
    label: 'SIDENAV_FARM',
    route: '/farm',
    activeIcon: require('assets/tab-farm-active.png'),
    inactiveIcon: require('assets/tab-farm-inactive.png'),
    isProtected: false,
  },
  {
    key: 'faq',
    label: 'SIDENAV_FAQ',
    route: '/faq',
    activeIcon: require('assets/tab-faq-active.png'),
    inactiveIcon: require('assets/tab-faq-inactive.png'),
    isProtected: false,
  },
  {
    key: 'setting',
    label: 'SIDENAV_SETTING',
    route: '/setting',
    activeIcon: require('assets/tab-setting-active.png'),
    inactiveIcon: require('assets/tab-setting-inactive.png'),
    isProtected: true,
  },
];

const DrawerList = () => {
  const history = useHistory();
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const redirectTo = (route: string, key: string) => {
    setActiveMenu(key);
    history.push(route);
  };

  const { isAuthenticated } = useAuthenticationContext();

  return (
    <div className={classes.list}>
      <List>
        {Categories.map((category, index) => (
          <li style={{ position: "relative" }}>
            <ListItem
              button
              key={category.label}
              onClick={() => redirectTo(category.route, category.key)}
              className={clsx(
                classes.listItem,
                activeMenu === category.key ? classes.active : '',
              )}
              disabled={category.isProtected && !isAuthenticated}
            >
              <ListItemAvatar classes={{ root: classes.avatarRoot }}>
                <img
                  className={classes.icon}
                  src={
                    activeMenu === category.key
                      ? category.activeIcon.default
                      : category.inactiveIcon.default
                  }
                  alt="secure"
                />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary={t(category.label)}
              />
            </ListItem>
            {category.isProtected && !isAuthenticated && <img src={LockIcon} alt="lock icon" className={classes.lockIcon} />}            
          </li>
        ))}
      </List>
    </div>
  );
};

export default function Home({
  mobileOpen,
  handleDrawerToggle,
}: {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            className={classes.closeMenuButton}
          >
            <CloseIcon />
          </IconButton>
          <DrawerList />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={clsx(classes.toolbar, classes.logoWrapper)}>
            <ListItemAvatar>
              <img
                className={classes.logo}
                src={require('assets/main-logo.png').default}
                alt="secure"
              />
            </ListItemAvatar>
          </div>
          <DrawerList />
        </Drawer>
      </Hidden>
    </nav>
  );
}
