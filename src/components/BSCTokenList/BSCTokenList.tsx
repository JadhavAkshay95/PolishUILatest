import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useDecimalValue } from 'modules/tokens/useDecimalValue';
import { formatUsd } from 'utils/formatUsd';
// import clsx from 'clsx';
import { useParams } from 'react-router-dom';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CircularProgress from '@material-ui/core/CircularProgress';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import { useAssetResults } from 'modules/assets/useAssetResults';
import { useTranslation } from 'react-i18next';
import DoghnutChart, { ChartColors } from 'components/Charts/Doghnut';
import { TableList } from '../UI';

const TotalToken = ({ value, decimals }: { value: any; decimals: number }) => {
  const { roundedValue } = useDecimalValue({
    value,
    decimals,
    precision: false,
  });
  return <span>{roundedValue?.toFixed(4)}</span>;
};

const Table = [
  {
    label: 'No',
    size: 50,
    key: 'srNumber',
  },
  {
    label: 'Assets',
    key: 'value',
    component: ({ value }: { value: any }) => (
      <span style={{ fontWeight: 600 }}>
        {value.symbol ?? value.name ?? 'Unknown'}
      </span>
    ),
  },
  {
    label: 'Balance',
    key: 'value',
    component: ({ value }: { value: any }) => {
      console.log(value);
      return <TotalToken value={value.value} decimals={value.decimals ?? 18} />;
    },
  },
  {
    label: 'Price',
    key: 'tokenPrice',
    component: ({ value }: { value: any }) =>
      `${value ? '$' : ''}${value?.toFixed(2) || '--'}`,
  },
  {
    label: 'Value',
    key: 'priceInUsd',
    component: ({ value }: { value: any }) => (
      <>
        {value
          ? value.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            })
          : null}
      </>
    ),
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 20px',
      display: 'flex',
    },
    summary: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      color: theme.colors.primaryText,
      textAlign: 'center',
      padding: '0 20px 20px 20px',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 200,
      minHeight: 50,
      marginRight: 20,
    },
    totalValText: {
      textAlign: 'center',
      padding: 5,
      border: `1px solid ${theme.colors.secondary}`,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      background: theme.colors.secondary,
      color: `${theme.colors.white}7A`,
      fontSize: 16,
      fontWeight: 600,
    },
    totalVal: {
      textAlign: 'center',
      padding: 5,
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: 800,
    },
    profit: {
      color: theme.colors.green,
    },
    loss: {
      color: theme.colors.red,
    },
    percentage: {
      textAlign: 'center',
      padding: '5px 0 5px, 5px',
      fontSize: 16,
      marginTop: 10,
      fontWeight: 800,
    },
    profitUpIcon: {
      color: theme.colors.green,
      fontSize: '2rem',
      marginTop: 10,
    },
    profitDownIcon: {
      color: theme.colors.red,
      fontSize: '2rem',
      marginTop: 10,
    },
    skeleton: {
      height: 33,
    },
    loader: {
      marginTop: 10,
    },
    valueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    address: {
      color: theme.colors.cornflowerblue,
    },
    chain: {
      color: theme.colors.crimson,
    },
    chainDesc: {
      margin: '20px auto',
      width: '50%',
    },
    chainValue: { padding: 10, fontWeight: 600, textAlign: 'center' },
    chart: {
      height: 150,
      width: 100,
    },
    chainSummary: {
      display: 'flex',
      flexDirection: 'row',
    },
    chainWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    chartLabels: {
      color: theme.colors.white,
      backgroundColor: theme.colors.darkGray,
      justifyContent: 'space-around',
      display: 'flex',
      alignItems: 'center',
      minHeight: 50,
    },
    label: {
      fontSize: 12,
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const BSCTokenList = ({
  tokens,
  loading,
}: {
  tokens: any;
  loading: boolean;
}) => {
  const classes = useStyles();
  const { address } = useParams<any>();
  const { t } = useTranslation();

  const { totalValueOfAllTokens, tokensAndPrices } = tokens;

  const labels = [];
  const values = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; ++i) {
    if (tokensAndPrices[i]) {
      labels.push(tokensAndPrices[i].value.symbol);
      values.push(tokensAndPrices[i].priceInUsd);
    }
  }
  return (
    <>
      <div className={classes.wrapper}>
        {/* <Paper className={classes.chainDesc} elevation={3}>
          <div className={classes.chainValue}>
            Blockchain: <span className={classes.chain}>BINANCE</span>
          </div>
          <div className={classes.chainValue}>
            Address: <span className={classes.address}>{address}</span>
          </div>
        </Paper> */}

        <div className={classes.summary}>
          <div className={classes.chart}>
            <DoghnutChart
              style={{ height: '200px', width: '120px' }}
              labels={labels}
              values={values}
            />
          </div>
          <div className={classes.chainWrapper}>
            <div className={classes.chainSummary}>
              <div className={classes.paper}>
                <div className={classes.totalValText}>{t('GENERAL_ASSET')}</div>
                {loading ? (
                  <div className={classes.valueWrapper}>
                    <CircularProgress
                      color="secondary"
                      className={classes.loader}
                    />
                  </div>
                ) : (
                  <div className={classes.totalVal}>
                    {formatUsd(totalValueOfAllTokens ?? 0)}
                  </div>
                )}
              </div>
              <div className={classes.paper}>
                <div className={classes.totalValText}>
                  {t('GENERAL_TOTAL_DEBTS')}
                </div>
                {loading ? (
                  <div className={classes.valueWrapper}>
                    <CircularProgress
                      color="secondary"
                      className={classes.loader}
                    />
                  </div>
                ) : (
                  <div className={classes.totalVal}>{formatUsd(0)}</div>
                )}
              </div>
              <div className={classes.paper}>
                <div className={classes.totalValText}>
                  {t('GENERAL_TOBE_CLAIMED')}
                </div>
                {loading ? (
                  <div className={classes.valueWrapper}>
                    <CircularProgress
                      color="secondary"
                      className={classes.loader}
                    />
                  </div>
                ) : (
                  <div className={classes.totalVal}>{formatUsd(0)}</div>
                )}
              </div>
            </div>
            {/* <Paper className={classes.paper} elevation={3}>
            <div className={classes.totalValText}>Total Profile/Loss (24h)</div>
            <div className={classes.valueWrapper}>
              {loading ? (
                <CircularProgress
                  color="secondary"
                  className={classes.loader}
                />
              ) : (
                <>
                  {totalProfitLoss >= 0 ? (
                    <ArrowUpwardIcon className={classes.profitUpIcon} />
                  ) : (
                    <ArrowDownwardIcon className={classes.profitDownIcon} />
                  )}

                  <div
                    className={clsx(
                      classes.totalVal,
                      totalProfitLoss >= 0 ? classes.profit : classes.loss,
                    )}
                  >
                    {formatUsd(totalProfitLoss)}
                  </div>
                  <div
                    className={clsx(
                      classes.percentage,
                      totalProfitLoss >= 0 ? classes.profit : classes.loss,
                    )}
                  >
                    {`(${profitLossPercetage.toFixed(2)}%)`}
                  </div>
                </>
              )}
            </div>
          </Paper> */}
            <div className={classes.chartLabels}>
              {labels.map((lbl, idx) => (
                <div className={classes.label}>
                  <div
                    style={{
                      borderRadius: '50%',
                      padding: 2,
                      border: `1px solid ${ChartColors[idx]}`,
                      background: ChartColors[idx],
                      marginRight: 10,
                      height: 1,
                      width: 1,
                    }}
                  />
                  {lbl}
                </div>
              ))}
            </div>
          </div>
        </div>
        <main className={classes.content}>
          <TableList
            columns={Table}
            totalCount={tokensAndPrices?.length || 0}
            data={tokensAndPrices ?? []}
            rowsPerPage={50}
            notFoundText="Assets not found"
            loading={loading}
          />
        </main>
      </div>
    </>
  );
};

export default BSCTokenList;
