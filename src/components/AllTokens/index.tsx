import React, { useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useStatementContext } from 'context/StatementContext';
import { useDecimalValue } from 'modules/tokens/useDecimalValue';
import { formatUsd } from 'utils/formatUsd';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from 'react-i18next';
import { useBSCStatementContext } from 'context/BSCStatementContext';
import DoghnutChart, { ChartColors } from 'components/Charts/Doghnut';
import { TableList } from '../UI';

const TotalToken = ({ value, decimals }: { value: any; decimals: number }) => {
  const { roundedValue } = useDecimalValue({
    value,
    decimals,
    precision: false,
  });
  return <span>{roundedValue}</span>;
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
      <span style={{ fontWeight: 600 }}>{value.symbol ?? value.name}</span>
    ),
  },
  {
    label: 'Balance',
    key: 'value',
    component: ({ value }: { value: any }) => (
      <TotalToken value={value.value} decimals={value.decimals} />
    ),
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

export default function AllTokenList() {
  const classes = useStyles();
  const { address } = useParams<any>();
  const { t } = useTranslation();

  const {
    isFetching,
    endAssetsData: { totalValueOfAllTokens, tokensAndPrices },
  } = useStatementContext();
  const { loading, tokenList } = useBSCStatementContext();

  const isLoading = isFetching || loading;

  const totalPortfolioValue =
    totalValueOfAllTokens + tokenList.totalValueOfAllTokens;

  const allTokenList = [
    ...(tokensAndPrices ?? []),
    ...(tokenList.tokensAndPrices ?? []),
  ].sort((a, b) => {
    const priceA = a.priceInUsd ?? 0;
    const priceB = b.priceInUsd ?? 0;

    if (priceA > priceB) {
      return -1;
    }
    if (priceA < priceB) {
      return 1;
    }
    return 0;
  });

  console.log(tokensAndPrices);
  const labels = [];
  const values = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 5; ++i) {
    if (allTokenList[i]) {
      labels.push(allTokenList[i].value.symbol);
      values.push(allTokenList[i].priceInUsd);
    }
  }

  console.log(labels, values);

  return (
    <>
      <div className={classes.wrapper}>
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
                {isLoading ? (
                  <div className={classes.valueWrapper}>
                    <CircularProgress
                      color="secondary"
                      className={classes.loader}
                    />
                  </div>
                ) : (
                  <div className={classes.totalVal}>
                    {formatUsd(totalPortfolioValue)}
                  </div>
                )}
              </div>
              <div className={classes.paper}>
                <div className={classes.totalValText}>
                  {t('GENERAL_TOTAL_DEBTS')}
                </div>
                {isLoading ? (
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
                {isLoading ? (
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
            totalCount={allTokenList?.length || 0}
            data={allTokenList ?? []}
            rowsPerPage={50}
            notFoundText="Assets not found"
            loading={isLoading}
          />
        </main>
      </div>
    </>
  );
}
