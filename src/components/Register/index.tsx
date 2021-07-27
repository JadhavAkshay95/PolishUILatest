import React, { ReactElement, useState } from 'react';
import {
  Label,
  InputField,
  FormItemLabel,
  DesktopModal,
  ActionButton,
} from 'components/UI';
import { FormikHelpers, useFormik } from 'formik';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import RegisterSchema from './schema';
import useStyles from './style';

const Moralis = require('moralis');

const FormInputConfig = [
  {
    field: 'name',
    fieldType: 'text',
    placeHolder: 'GENERAL_YOUR_NAME',
    label: 'GENERAL_YOUR_NAME',
  },
  {
    field: 'username',
    fieldType: 'text',
    placeHolder: 'GENERAL_USERNAME',
    label: 'GENERAL_USERNAME',
  },
  {
    field: 'email',
    fieldType: 'text',
    placeHolder: 'GENERAL_EMAIL_ADDRESS',
    label: 'GENERAL_EMAIL_ADDRESS',
  },
  {
    field: 'password',
    fieldType: 'password',
    placeHolder: 'GENERAL_PASSWORD',
    label: 'GENERAL_PASSWORD',
  },
];

const initialValues: any = {
  email: '',
  password: '',
  username: '',
  name: '',
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

  const register = async (formikValues: any) => {
    try {
      setLoading(true);
      const user = new Moralis.User();
      user.set('email', formikValues.email);
      user.set('password', formikValues.password);
      user.set('username', formikValues.username);
      user.set('name', formikValues.name);
      await user.save();
      setIsAuthenticated(true);
      handleFormClose();
    } catch (e) {
      setServerError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    validateOnChange: true,
    onSubmit: register,
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
        <Label
          component="div"
          variant="h2"
          className={classes.infoMsg}
          text="REGISTER_NEW_ACCOUNT"
        />
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
              <Label variant="body1">{t('Register')}</Label>
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
