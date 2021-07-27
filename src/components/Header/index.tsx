import React, {
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from 'react';
import { useHistory } from 'react-router-dom';

import { Typography, Grid, Button, Avatar } from '@material-ui/core';
import { makeStyles, fade } from '@material-ui/core/styles';
import Login from 'components/Login';
import Register from 'components/Register';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import clsx from 'clsx';
import { IS_USER_LOGGED_IN } from 'constants/config';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useWalletDetailCurrencyDetailsStyles } from 'components/Wallets/styles';
import { AddressContext } from 'context/AddressContext';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import UserMenu from '../UserMenu/UserMenu';

const Moralis = require('moralis');

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: '6.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10.625rem',
    backgroundColor: theme.colors.secondary
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  right: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    '& $items': {
      '& li a': {
        padding: '1.3125rem',
      },
    },
  },
  left: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& $items': {
      '& li': {
        padding: '20px 10px',
      },
    },
  },
  items: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    '& li': {
      listStyleType: 'none',
      textAlign: 'center',
      '&:last-child': {
        borderRight: 0,
      },
    },
    '&:hover $dropdown': {
      visibility: 'visible',
    },
  },
  logout: {
    fontWeight: 500,
    textTransform: 'capitalize',
    fontSize: 16,
    width: 130,
    height: 50,
  },
  login: {
    color: theme.colors.white,
    backgroundColor: theme.colors.secondary,
    marginRight: 10,
  },
  register: {
    backgroundColor: theme.colors.primary,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.colors.darkGray,
    '&:hover': {
      backgroundColor: theme.colors.darkGray,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: `${theme.colors.white}5A`
  },
  searchIconBtn: {
    fill: `${theme.colors.white}5A`
  },
}));
export default function Header({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) {
  const [error, setError] = useState('');
  const [isLoginModalOpen, toggleLoginModal] = useState(false);
  const [isRegisterModalOpen, toggleRegisterModal] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useAuthenticationContext();
  const [isShowAddressField, setIsShowAddressField] = useState(false);
  const [addressField, setAddressField] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

  const formControlClasses = useWalletDetailCurrencyDetailsStyles();
  const addressInfo: any = localStorage.getItem('address');
  const history = useHistory();

  const classes = useStyles();
  const { t } = useTranslation();

  const context = useContext(AddressContext);

  useEffect(() => {
    const value = localStorage.getItem(IS_USER_LOGGED_IN);
    if (value && JSON.parse(value)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    setIsShowAddressField(false);
    if (addressInfo && addressInfo !== '') {
      setIsShowAddressField(true);
      setAddressField(addressInfo);
    }
  }, [context?.isAddressAvailable]);

  const currentUser = Moralis.User.current();

  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.setItem(IS_USER_LOGGED_IN, 'false');
    await Moralis.User.logOut();
  };

  const onSearch = (e: any) => {
    if(e.key === 'Enter' || e.keyCode === 13) {
      history.push(`/dashboard/${searchAddress}`);
    }
  }

  return (
    <div className={classes.appBar}>
      <Login isOpen={isLoginModalOpen} toggleModal={toggleLoginModal} />
      <Register
        isOpen={isRegisterModalOpen}
        toggleModal={toggleRegisterModal}
      />
       <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon classes={{ root: classes.searchIconBtn }} />
          </div>
          <InputBase
            placeholder="Search for wallet address, protocols or tokens"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            onKeyUp={onSearch}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>

      <Grid className={classes.left} item>
        <ul className={classes.items}>
          <>
            {currentUser && isAuthenticated ? (
              <>
                <Grid className={classes.left} item>
                  {isShowAddressField && (
                    <FormControl
                      variant="outlined"
                      className={formControlClasses.formControl}
                    >
                      <Select
                        value="ALL"
                        className={formControlClasses.filter_dropdown}
                      >
                        <MenuItem value="ALL">
                          Account 1 ({addressField.substr(0, 9)}...
                          {addressField.substr(-7)})
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <UserMenu currentUser={currentUser} />
              </>
            ) : (
              <>
                <Button
                  className={clsx(classes.logout, classes.login)}
                  onClick={() => toggleLoginModal(true)}
                >
                  {t('LOGIN')}
                </Button>
                <Button
                  className={clsx(classes.logout, classes.register)}
                  onClick={() => toggleRegisterModal(true)}
                >
                  {t('REGISTER')}
                </Button>
              </>
            )}
          </>
        </ul>
      </Grid>
    </div>
  );
}
