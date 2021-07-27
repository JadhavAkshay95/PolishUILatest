import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { PopoverProps } from '@material-ui/core/Popover/Popover';
import StyledMenu from '../Menu/StyledMenu';
import StyledMenuItem from '../Menu/StyledMenuItems';

const useStyles = makeStyles((theme) => ({
  hov: {
    position: 'absolute',
    visibility: 'hidden',
  },
  listIcon: {
    height: '2rem',
    maxWidth: '1.2375rem',
    marginRight: '1.6875rem',
    position: 'relative',
    color: theme.colors.white,
    '&.MuiListItemIcon-root': {
      minWidth: '1.2375rem',
    },
  },
  names: {
    display: 'inline-block',
    flex: 'none', 
    '& :hover': {
      color: theme.colors.primary,
    },
    '& span': {
      color: theme.colors.white,
      fontSize: '1rem !important',
      fontWeight: 'bold',
      width: 'fit-content',
      display: 'inline-block'
    },
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  navs?: {
    name: string;
    defaultImg?: string; // TEMP: As logout design is not there making imges optional
    hoverImg?: string; // TEMP: As logout design is not there making imges optional
    route?: string;
    clickMethod?: any;
  }[];
  anchorEl?: PopoverProps['anchorEl'];
  onClickWallet?: any;
}

const DropdownMenu = ({ navs, onClickWallet, anchorEl, open, onClose }: Props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const goTo = (e: any, route: string) => {
    e.stopPropagation();
    onClose();
    if (onClickWallet) {
      onClickWallet(route);
    } else {
      history.push(route);
    }
  };

  return (
    <StyledMenu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      keepMounted
    >
      {navs &&
        navs.map((item: any, index: number) => {
          return (
            <StyledMenuItem
              key={index} //eslint-disable-line 
              onClick={(e) => item.clickMethod ? item.clickMethod() :  goTo(e, item.route)}
            >
              <ListItemIcon className={classes.listIcon}>
                {item.defaultImg && (
                  <img src={item.defaultImg.default} alt={item.name} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={t(`${item.name}`)}
                className={classes.names}
              />
            </StyledMenuItem>
          );
        })}
    </StyledMenu>
  );
};

export default DropdownMenu;
