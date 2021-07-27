import React, { useEffect, useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import {
  fade,
  makeStyles,
  Theme,
  withStyles,
  createStyles,
} from '@material-ui/core/styles';
import BannerFaq from 'assets/banner-faq.png';
import { Label } from 'components/UI';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      flexDirection: 'column',
      padding: '0 8em',
      display: 'flex',
      marginBottom: '2em',
    },
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 300,
      background: theme.colors.primary,
      padding: 20,
      boxShadow: '2px 3px #888888',
      marginTop: 30,
      [theme.breakpoints.up('md')]: {
        width: '65%',
        transform: 'translateX(25%)',
      },
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      color: theme.colors.white,
      fontSize: 24,
      padding: '10px 20px 0px 0px',
      marginBottom: '12px',
    },
    subTitle: {
      color: theme.colors.primaryText,
      fontSize: 16,
      padding: '10px 20px 0px 0px',
    },
    paper: {
      padding: '30px 50px',
      backgroundImage: `url(${BannerFaq})`,
      backgroundSize: 'cover',
      marginBottom: '18px',
      [theme.breakpoints.down('md')]: {
        padding: '7px 42px',
      },
      [theme.breakpoints.down('sm')]: {
        padding: '7px 35px',
      },
    },
    infoText: {
      fontWeight: 'bold',
      fontSize: 24,
    },
    tagLine: {
      marginTop: 10,
    },
    walletBtn: {
      color: theme.colors.white,
      backgroundColor: theme.colors.secondary,
      textTransform: 'capitalize',
      marginTop: 30,
    },
    faqHeader: {
      marginLeft: '12em',
    },
    portfolio_inputButton: {
      borderLeft: '1px solid lightgray',
      width: 'fit-content',
      padding: '4px 12px',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '12px',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightBold,
    },
    accordWrap: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    MuiAccordionroot: {
      padding: '30px',
      width: '49%',
      border: '1px solid white',
      background: theme.colors.darkGray,
      marginTop: '12px',
      color: 'white',
      '&:nth-child(2n + 2)': {
        marginLeft: '16px',
      },
      [theme.breakpoints.down('md')]: {
        width: '48%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '40%',
        padding: '15px',
      },
    },
    expandIcon: {
      color: 'white',
    },
    detail: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: 0,
    },
  }),
);

const AccordionSummary = withStyles({
  expandIcon: {
    color: 'white',
  },
})(MuiAccordionSummary);

export default function Faq() {
  const classes = useStyles();
  const [faqs, setFaqs] = useState([1, 2, 3, 4, 5, 5, 6, 6, 4]);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const { t } = useTranslation();

  const accord = () => {
    return (
      <>
        {faqs.map((faq, idx) => {
          return (
            <>
              <Accordion
                expanded={expanded === `panel${idx}`}
                onChange={handleChange(`panel${idx}`)}
                classes={{
                  root: classes.MuiAccordionroot,
                }}
              >
                <AccordionSummary
                  expandIcon={
                    expanded === `panel${idx}` ? <CloseIcon /> : <AddIcon />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>
                    What is Loreum Ipsum?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.detail}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Label variant="h2" className={classes.title} text="SIDENAV_FAQ" />
        <Paper className={classes.paper}>
          <div className={classes.faqHeader}>
            <div className={classes.infoText}>{t('FAQ_HEADER_TEXT')}</div>
            <div className={classes.tagLine}> {t('FAQ_HEADER_SUBTEXT')}</div>
          </div>
        </Paper>
        <Button variant="contained" className={classes.portfolio_inputButton}>
          {t('FAQ_ALL_TOPICS')}
        </Button>
        <div className={classes.accordWrap}>{accord()}</div>
      </div>
    </>
  );
}
