import React, { ReactElement, useEffect, useState } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import { Button } from '@material-ui/core';
import { FormikHelpers, useFormik } from 'formik';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import { sendTransaction } from '../Wallets/metamask';
import WalletSendSchema from './schema';
import useStyles from './style';

// const Moralis = require('moralis');

const FormInputConfig = [
  {
    field: 'amount',
    fieldType: 'number',
    placeHolder: 'Amount',
    label: 'Amount',
  },
  {
    field: 'send_to',
    fieldType: 'text',
    placeHolder: 'Send To',
    label: 'Send To',
  },
  {
    field: 'reference',
    fieldType: 'text',
    placeHolder: 'Reference',
    label: 'Reference',
  },
];

const initialValues: any = {
  amount: '',
  send_to: '',
  reference: '',
};

const WalletSend = ({
  isOpen,
  toggleModal,
  openWalletSendResult,
  address,
}: {
  isOpen: boolean;
  toggleModal: any;
  openWalletSendResult: any;
  address: string;
}): ReactElement => {
  const [serverErrors, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const walletSend = async (formValues: any) => {
    try {
      setLoading(true);
      const txHash = await sendTransaction(
        formValues.send_to,
        address,
        formValues.amount,
      );
      if (txHash) {
        openWalletSendResult({ address, txHash });
        handleFormClose();
      } else {
        throw new Error('Unable to send transaction');
      }
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: WalletSendSchema,
    validateOnChange: true,
    onSubmit: walletSend,
  });

  const {
    values,
    setFieldValue,
    resetForm: resetFields,
    handleSubmit,
    errors,
    isSubmitting,
  } = formik;

  const handleFormClose = () => {
    setServerError(null);
    toggleModal(!isOpen);
  };

  return (
    <DesktopModal isVisible={isOpen} handleClose={handleFormClose}>
      <div className={classes.root}>
        <Label component="div" variant="h2" className={classes.infoMsg}>
          Send
        </Label>
        <form autoComplete="off">
          <div className={classes.fields}>
            {FormInputConfig.map((config) => {
              return (
                <FormItemLabel
                  key={config.label}
                  label={t(config.label)}
                  error={errors[config.field] as any}
                  formControlClass={classes.formControlClass}
                >
                  <InputField
                    type={config.fieldType}
                    variant="outlined"
                    name={config.field}
                    value={values[config.field]}
                    margin="dense"
                    hiddenLabel
                    placeholder={t(config.placeHolder)}
                    onChange={(e: any) =>
                      setFieldValue(config.field, e.target.value)
                    }
                  />
                </FormItemLabel>
              );
            })}

            <span>{serverErrors}</span>

            <ActionButton
              className={classes.actionBtn}
              showLoading={loading}
              onClick={() => handleSubmit()}
            >
              <Label variant="body1" text="Send" />
            </ActionButton>
          </div>
          <Label variant="subtitle1" className={classes.infoMessage}>
            Please note that large transaction amount may not be processed
            instantaneously.{' '}
            <a href="/" target="_blank">
              More Info
            </a>
          </Label>
        </form>
      </div>
    </DesktopModal>
  );
};

export default WalletSend;
