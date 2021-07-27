import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useWalletDetailCurrencyDetailsStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    currency_details: {
      color: theme.colors.white,
      padding: '0px 10px',
    },
    currency_name: {
      fontWeight: 'bold',
      display: 'block',
      margin: '5px 0',
    },
    currency_balance: {
      fontSize: '14px',
    },
    button_container: {
      padding: '10px 0',
    },
    button: {
      fontWeight: 'bold',
      textTransform: 'capitalize',
      fontSize: 16,
      width: 150,
      height: 50,
      color: theme.colors.white,
      backgroundColor: theme.colors.secondary,
    },
    buttonPrimary: {
      fontWeight: 'bold',
      textTransform: 'capitalize',
      fontSize: 16,
      width: 150,
      height: 50,
      backgroundColor: theme.colors.primary,
      marginRight: '15px',
    },
    transaction_container: {
      padding: '20px 0',
    },
    transaction_heading: {
      margin: '12px 0',
      display: 'inline-block',
    },
    transaction_filter: {
      float: 'right',
    },
    filter_dropdown: {
      height: '40px',
      color: theme.colors.white,
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline,&:hover .MuiOutlinedInput-notchedOutline':
        {
          borderColor: '#606162',
        },
      '& .MuiSelect-icon': {
        color: '#FAFBFC',
      },
    },
    transaction_table_row_head: {
      color: theme.colors.white,
      borderColor: '#606162',
      opacity: 0.6,
      fontSize: 14,
      padding: 10,
    },
    transaction_table_row: {
      color: theme.colors.white,
      borderColor: '#606162',
      fontSize: 14,
      padding: 10,
    },
    status_icon: {
      height: 24,
      width: 24,
    },
  }),
);

const useWalletDetailCurrencyStyles = makeStyles((theme: Theme) =>
  createStyles({
    currency_item: {
      borderBottom: 'solid 1px #333',
      display: 'flex',
      flexFlow: 'row',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#222222',
      },
    },
    active: {
      backgroundColor: '#FFC765',
      color: '#000000',
      '&:hover': {
        backgroundColor: '#FFC765',
      },
    },
    currency_logo: {
      margin: '25px 0px 25px 20px',
      height: '50px',
      width: '50px',
      alignSelf: 'center',
    },
    currency_details: {
      margin: '25px 0px 25px 20px',
      alignSelf: 'center',
    },
    currency_name: {
      fontWeight: 'bold',
      display: 'block',
    },
    currency_balance: {
      fontSize: '14px',
    },
  }),
);

const useWalletDetailStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 'auto auto',
    },
    wrapper: {
      width: '1024px',
      marginTop: '15px',
      display: 'flex',
      alignItems: 'flex-start',
    },
    heading: {
      font: 'normal normal bold 30px/41px Arial',
      letterSpacing: '0',
      color: theme.colors.white,
      opacity: '1',
    },
    your_holding_box: {
      flex: 1,
      backgroundColor: 'black',
      color: 'white',
      borderRadius: '5px',
    },
    currency_container: {
      height: '400px',
      overflowY: 'scroll',
    },
    coin_details_box: {
      flex: 2,
      padding: '10px',
    },
    box_heading: {
      margin: '0px',
      padding: '20px 30px',
      borderBottom: 'solid 1px #333',
    },
  }),
);

const useWalletStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 'auto auto',
    },
    wrapper: {
      width: '720px',
      marginTop: '15px',
      display: 'flex',
    },
    wallet: {
      color: theme.colors.white,
      textTransform: 'capitalize',
      padding: '15px 35px',
      flex: '0.49',
      height: '80px',
      fontWeight: 'bold',
      fontSize: '20',
      background: '#000000 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: '1',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        background: '#2C2C2C 0% 0% no-repeat padding-box',
      },
    },
    partition: {
      flex: '0.02',
    },
    heading: {
      font: 'normal normal bold 30px/41px Arial',
      letterSpacing: '0',
      color: '#FFFFFF',
      opacity: '1',
    },
    wallet_text: {
      font: 'normal normal bold 20px/27px Arial',
      letterSpacing: '0',
      color: '#FFFFFF',
      opacity: '1',
    },
    metamask_icon: {
      marginRight: '10px',
    },
    tyklo_icon: {
      width: '38px',
      height: '38px',
      marginRight: '10px',
    },
  }),
);

const usePortfolioStyles = makeStyles((theme: Theme) =>
  createStyles({
    portfolio_header: {
      textAlign: 'left',
      margin: '20px 2px',
      font: 'normal normal 600 16px/22px Arial',
      letterSpacing: '0px',
      color: '#FFFFFF',
      opacity: '1',
    },
    portfolio_address_wrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '162px',
      background: '#000000 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: '1',
      '& label': {
        font: 'normal normal normal 16px/22px Arial',
        letterSpacing: '0',
        color: '#FFFFFF',
        opacity: '1',
        flex: 0.8,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    },
    portfolio_input: {
      display: 'flex',
      alignItems: 'center',

      '& input': {
        flex: '1',
        height: '36px',
        backgroundColor: '#000000',
        color: 'white',
        border: '1px solid #535353',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
      },

      '& input:hover': {
        background: '#222222 0% 0% no-repeat padding-box',
      },
      '& button:hover': {
        background: '#F5F5F5 0% 0% no-repeat padding-box;',
      },
    },

    portfolio_inputButton: {
      borderLeft: '1px solid lightgray',
      borderTopLeftRadius: '0 !important',
      borderBottomLeftRadius: '0 !important',
    },
  }),
);

export const useTykloStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
    },
    partition: {
      flex: '0.02',
    },
    logo: {
      marginTop: '100px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '82px',
      height: '82px',
    },
    header: {
      textAlign: 'center',
      font: 'normal normal bold 25px/34px Arial',
      letterSpacing: '0px',
      color: '#FFFFFF',
      margin: '30px 0 50px 0',
    },
    import_header: {
      textAlign: 'center',
      font: 'normal normal bold 25px/34px Arial',
      letterSpacing: '0px',
      color: '#FFFFFF',
      margin: '10px 0 10px 0',
    },
    card: {
      background: '#000000 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      flex: 0.49,
      cursor: 'pointer',
      '&:hover': {
        background: '#2C2C2C 0% 0% no-repeat padding-box',
      },
    },
    cardIcon: {
      width: '35px',
      height: '42px',
      color: '#FFC765',
      margin: '15px 0',
    },
    title: {
      textAlign: 'center',
      font: 'normal normal normal 14px/20px Arial !important',
      letterSpacing: '0px',
      color: '#FFFFFF',
    },
    import_title: {
      textAlign: 'center',
      font: 'normal normal normal 14px/20px Arial !important',
      letterSpacing: '0px',
      color: '#FFFFFF',
      margin: '10px 0 20px 0',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15px 15px',
    },
    h2: {
      textAlign: 'center',
      font: 'normal normal bold 20px/32px Arial !important',
      letterSpacing: '0px',
      color: '#FFFFFF',
    },
    button: {
      width: '100% !important',
    },
    buttonNext: {
      width: '60% !important',
      background: '#FABE56 0% 0% no-repeat padding-box',
      borderRadius: '5px',
    },
    btn_mneumonicOptions: {
      width: '130px',
      height: '42px',
      background: 'rgba(48, 48, 48, 1) 0% 0% no-repeat padding-box',
      borderRadius: '3px',
      color: 'white',
      '&:hover': {
        color: 'black',
      },
      margin: '5px',
    },
    wrapper_mneumonicOptions: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '30px',
    },

    textArea: {
      background: '#222222 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      color: 'white',
      padding: '15px',
      width: '100%',
    },
    checkbox_wrapper: {
      display: 'flex',
      margin: '20px 0 20px 0',
      width: '100%',
    },
    checkbox: {
      paddingTop: '0px !important',
    },
    msg: {
      font: 'normal normal normal 14px/19px Arial',
      letterSpacing: '0px',
      color: '#FFFFFF',
      margin: '20px 0 20px 0',
    },
    containerImport: {
      width: '476px',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      margin: 'auto',
    },
    containerMneumonic: {
      width: '560px',
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '0 0 40px 0',
    },
    secret: {
      width: '100%',
      height: '190px',
      background: '#000000 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: '1',
      backdropFilter: 'blur(20px)',
      webkitBackdropFilter: 'blur(10px)',
      color: 'white',
      padding: '25px 20px',
      wordSpacing: '30px',
      lineHeight: '30px',
    },
    mneumonicContainer: {
      width: '100%',
      height: '190px',
      background: '#000000 0% 0% no-repeat padding-box',
      borderRadius: '5px',
      opacity: '1',
      color: 'white',
      padding: '25px 20px',
      marginBottom: '20px',
      wordSpacing: '20px',
      lineHeight: '30px',
    },
  }),
);

export {
  useWalletDetailCurrencyDetailsStyles,
  useWalletDetailCurrencyStyles,
  useWalletDetailStyles,
  useWalletStyles,
  usePortfolioStyles,
};
