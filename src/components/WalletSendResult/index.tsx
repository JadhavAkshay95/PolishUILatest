import React, { ReactElement, useEffect, useState } from 'react';
import { Label, DesktopModal, ActionButton } from 'components/UI';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

// const Moralis = require('moralis');

const WalletReceive = ({
  isOpen,
  toggleModal,
  txDetails,
}: {
  isOpen: boolean;
  toggleModal: any;
  txDetails: any;
}): ReactElement => {
  const [serverErrors, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const { setIsAuthenticated } = useAuthenticationContext();

  const handleFormClose = () => {
    setServerError(null);
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <img
          src={require('assets/success.png').default}
          alt="success"
          className={classes.successIcon}
        />
        <Label component="div" variant="h2" className={classes.infoMsg}>
          Sent Successfully!
        </Label>
        <Label variant="subtitle1" className={classes.infoMessage}>
          Your fund has sent successfully to
        </Label>
        <Label variant="subtitle1" className={classes.address}>
          {txDetails.address}
        </Label>
        <div className={classes.fields}>
          <table>
            <tr>
              <td align="left">Timestamp</td>
              <td align="right">15 Feb 2021; 10:39am</td>
            </tr>
            <tr>
              <td align="left">Transaction Hash</td>
              <td align="right">
                <a
                  href={`https://ropsten.etherscan.io/tx/${txDetails.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {txDetails.txHash.substr(0, 9)}...
                  {txDetails.txHash.substr(-7)}
                </a>
              </td>
            </tr>
          </table>
        </div>
        <ActionButton
          className={classes.actionBtn}
          showLoading={loading}
          onClick={() => handleFormClose()}
        >
          <Label variant="body1" text="Close" />
        </ActionButton>
      </div>
    </DesktopModal>
  );
};

export default WalletReceive;
