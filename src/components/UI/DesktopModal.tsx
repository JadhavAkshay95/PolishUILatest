import React, { ReactElement } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { IconButton, Avatar } from '@material-ui/core';
import clsx from 'clsx';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme: Theme) => ({
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(90,60,55,0.8)',
  },
  modalWrapper: {
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'relative',
    outline: 'none',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
  },
  cancelBtn: {
    position: 'absolute',
    top: '17px',
    right: '17px',
    zIndex: 2,
    color: theme.colors.white,
  },
}));

interface DesktopModalProps {
  isVisible: boolean;
  handleClose: () => void;
  children: ReactElement;
  showCancelBtn?: boolean;
  className?: string;
  [T: string]: any;
}

export const DesktopModal = ({
  isVisible,
  handleClose,
  children,
  showCancelBtn = true,
  className,
  ...others
}: DesktopModalProps) => {
  const classes = useStyles();

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      className={classes.modalContainer}
      closeAfterTransition
      {...others}
    >
      <div className={clsx(classes.modalWrapper, className)}>
        {showCancelBtn ? (
          <IconButton
            color="default"
            onClick={handleClose}
            className={classes.cancelBtn}
            title="cancel"
          >
            <CancelIcon />
          </IconButton>
        ) : null}
        {children}
      </div>
    </Modal>
  );
};
