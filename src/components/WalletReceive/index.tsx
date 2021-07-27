import React, { ReactElement, useEffect, useState } from 'react';
import { Label, DesktopModal, ActionButton } from 'components/UI';
// import { useAuthenticationContext } from 'context/AuthenticationContext';
// import { useTranslation } from 'react-i18next';
import QRCode from 'qrcode.react';
import useStyles from './style';


const WalletReceive = ({
  isOpen,
  toggleModal,
  address,
}: {
  isOpen: boolean;
  toggleModal: any;
  address: string;
}): ReactElement => {
  const classes = useStyles();
  // const { t } = useTranslation();
  // const { setIsAuthenticated } = useAuthenticationContext();

  const handleFormClose = () => {
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <Label component="div" variant="h2" className={classes.infoMsg}>
          Receive
        </Label>
        <div className={classes.fields}>
          <QRCode value={address} size={288} />
          <Label variant="subtitle1" className={classes.infoMessage}>
            Your Wallet Address
          </Label>
          <Label variant="subtitle1" className={classes.address}>
            {address}
          </Label>
        </div>
        <ActionButton className={classes.actionBtn}>
          <Label variant="body1" text="Print" />
        </ActionButton>
      </div>
    </DesktopModal>
  );
};

export default WalletReceive;
