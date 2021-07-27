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
import { IS_USER_LOGGED_IN } from 'constants/config';
import LoginSchema from './schema';
import useStyles from './style';

const Moralis = require('moralis');

const FormInputConfig = [
  {
    field: 'username',
    fieldType: 'text',
    placeHolder: 'GENERAL_USERNAME',
    label: 'GENERAL_USERNAME',
  },
  {
    field: 'password',
    fieldType: 'password',
    placeHolder: 'GENERAL_PASSWORD',
    label: 'GENERAL_PASSWORD',
  },
];

const initialValues: any = {
  username: '',
  password: '',
};

const Login = ({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: any;
}): ReactElement => {
  const [serverErrors, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();
  const { setIsAuthenticated } = useAuthenticationContext();

  const login = async (formValues: any) => {
    try {
      setLoading(true);
      const user = await Moralis.User.logIn(
        formValues.username,
        formValues.password,
        { userPost: true },
      );
      setIsAuthenticated(true);
      localStorage.setItem(IS_USER_LOGGED_IN, 'true');
      handleFormClose();
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnChange: true,
    onSubmit: login,
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
          {t('LOGIN_WELCOME_TEXT')}
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
              <Label variant="body1" text="LOGIN" />
            </ActionButton>
          </div>
          <Label variant="subtitle1" className={classes.signupLink}>
            {t('DO_NOT_HAVE_ACCOUNT_LOGIN')}
          </Label>
        </form>
      </div>
    </DesktopModal>
  );
};

export default Login;
