/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { makeStyles } from '@material-ui/core/styles';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
// import { USER_NAV } from './config';

import { useAuthenticationContext } from '../../context/AuthenticationContext';
import { IS_USER_LOGGED_IN } from '../../constants/config';

const Moralis = require('moralis');

const useStyles = makeStyles((theme) => ({
  initialsWrapper: {
    width: '4.875rem',
    height: '3.125rem',
    borderRadius: '0.3125rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.colors.dropdownColor
    },
    '&.selected': {
      backgroundColor: theme.colors.dropdownColor
    }
  },
  initials: {
    '&:hover $dropdown': {
      visibility: 'visible',
    },
    backgroundColor: theme.colors.cornflowerblue,
  },
  dropdownIcon: {
    fill: theme.colors.white,
  },
  userName: {
    textTransform: 'capitalize',
  }
}));

const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

const UserMenu = ({ currentUser }: { currentUser: any }) => {
  const anchorEl = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const handleMenuOpen = useCallback(() => setOpen(prevState => !prevState), [setOpen]);
  const handleMenuClose = useCallback(() => setOpen(false), [setOpen]);

  const classes = useStyles();

  const history = useHistory();

  const { setIsAuthenticated, isAuthenticated } = useAuthenticationContext();

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.setItem(IS_USER_LOGGED_IN, 'false');
    history.push("/")
    await Moralis.User.logOut();
  };

  const USER_NAV = [
    {
      name: 'Profile',
      defaultImg: require('assets/tab-setting-active.png'),
      hoverImg: require('assets/tab-setting-inactive.png'),
      route: '/profile/bet',
    },
    {
      name: 'Settings',
      defaultImg: require('assets/tab-setting-active.png'),
      hoverImg: require('assets/tab-setting-inactive.png'),
      route: '/profile/transactions',
    },
    {
      name: 'Logout',
      clickMethod: logout,
    },
  ];

  let initials = currentUser
    ? [...currentUser?.attributes?.name?.matchAll(rgx)] || []
    : [];

  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();

  return (
    <div
      className={clsx(classes.initialsWrapper, isOpen && 'selected')}
      ref={anchorEl}
      onMouseDown={handleMenuOpen}
    >
      <Avatar classes={{ colorDefault: classes.initials }}>
        <span className={classes.userName}>{initials}</span>
      </Avatar>
      <ArrowDropDownIcon className={classes.dropdownIcon} />
      <DropdownMenu
        open={isOpen}
        onClose={handleMenuClose}
        navs={USER_NAV}
        anchorEl={anchorEl.current}
      />
    </div>
  );
};

export default UserMenu;
