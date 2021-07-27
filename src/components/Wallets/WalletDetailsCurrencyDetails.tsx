import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';

// import { useTranslation } from 'react-i18next';
import WalletSend from 'components/WalletSend';
import WalletReceive from 'components/WalletReceive';
import WalletSendResult from 'components/WalletSendResult';
import moment from 'moment';
import { useWalletDetailCurrencyDetailsStyles } from './styles';
import { getRecentTransactions } from '../../api/moralis/accounts';

const WalletDetailsCurrencyDetails = (props: any) => {
  const { currency, address } = props;
  const classes = useWalletDetailCurrencyDetailsStyles();
  const [isSendModalOpen, toggleSendModal] = useState(false);
  const [isReceiveModalOpen, toggleReceiveModal] = useState(false);
  const [isSendResultModalOpen, toggleSendResultModal] = useState(false);
  const [txDetails, setTxDetails] = useState({ address: '', txHash: '' });
  const [rows, setRows] = useState<any>([]);
  const [trnxFilter, setTrnxFilter] = useState('ALL');
  // const { t } = useTranslation();
  // const screenText = useMemo(() => {
  //   return {
  //     walletHeader: t('WALLET_HEADER'),
  //     walletMetamask: t('WALLET_METAMASK'),
  //     walletTyklo: t('WALLET_TYKLO'),
  //   };
  // }, [t]);

  useEffect(() => {
    (async () => {
      try {
        const transactions = await getRecentTransactions(address, 'testnet');
        setRows(
          transactions
            .filter((transaction: any) => {
              return (
                trnxFilter === 'ALL' ||
                (trnxFilter === 'RECEIVED' &&
                  transaction.to_address === address) ||
                (trnxFilter === 'SENT' && transaction.to_address !== address)
              );
            })
            .map((transaction: any) => ({
              date: moment(transaction.block_timestamp).format('D MMM YYYY'),
              hash: transaction.hash,
              to: transaction.to_address,
              status:
                transaction.receipt_status === '1'
                  ? require('assets/icon-successful.jpg').default
                  : require('assets/icon-fail.jpg').default,
              amount: (+transaction.value / 1000000000000000000).toFixed(5),
            })),
        );
        console.log({ transactions });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [trnxFilter]);

  const openWalletSendResult = (details: any) => {
    setTxDetails(details);
    toggleSendResultModal(true);
  };

  return (
    <div className={classes.currency_details}>
      <WalletSend
        isOpen={isSendModalOpen}
        toggleModal={toggleSendModal}
        openWalletSendResult={openWalletSendResult}
        address={address}
      />
      <WalletSendResult
        isOpen={isSendResultModalOpen}
        toggleModal={toggleSendResultModal}
        txDetails={txDetails}
      />
      <WalletReceive
        isOpen={isReceiveModalOpen}
        toggleModal={toggleReceiveModal}
        address={address}
      />
      <h2 className={classes.currency_name}>{currency.name}</h2>
      <span className={classes.currency_balance}>
        {currency.balance} {currency.symbol}
      </span>
      <div className={classes.button_container}>
        <Button
          className={classes.buttonPrimary}
          onClick={() => toggleSendModal(true)}
        >
          Send
        </Button>
        <Button
          className={classes.button}
          onClick={() => toggleReceiveModal(true)}
        >
          Receive
        </Button>
      </div>
      <div className={classes.transaction_container}>
        <h5 className={classes.transaction_heading}>Recent Transaction</h5>
        <div className={classes.transaction_filter}>
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={trnxFilter}
              onChange={(event: any) => setTrnxFilter(event.target.value)}
              className={classes.filter_dropdown}
            >
              <MenuItem value="ALL">All</MenuItem>
              <MenuItem value="SENT">Sent</MenuItem>
              <MenuItem value="RECEIVED">Received</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.transaction_table_row_head}>
                Date
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                Transaction Hash
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                To
              </TableCell>
              <TableCell
                className={classes.transaction_table_row_head}
                align="center"
              >
                Status
              </TableCell>
              <TableCell className={classes.transaction_table_row_head}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow>
                <TableCell className={classes.transaction_table_row}>
                  {row.date}
                </TableCell>
                <TableCell className={classes.transaction_table_row}>
                  {row.hash.substr(0, 9)}...{row.hash.substr(-7)}
                </TableCell>
                <TableCell className={classes.transaction_table_row}>
                  {row.to.substr(0, 9)}...{row.to.substr(-7)}
                </TableCell>
                <TableCell
                  className={classes.transaction_table_row}
                  align="center"
                >
                  <img
                    src={row.status}
                    alt="status"
                    className={classes.status_icon}
                  />
                </TableCell>
                {row.to === address ? (
                  <TableCell
                    className={classes.transaction_table_row}
                    style={{ color: '#4EE65A' }}
                  >
                    + {row.amount} {currency.symbol}
                  </TableCell>
                ) : (
                  <TableCell
                    className={classes.transaction_table_row}
                    style={{ color: '#FF5F5F' }}
                  >
                    - {row.amount} {currency.symbol}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default React.memo(WalletDetailsCurrencyDetails);
