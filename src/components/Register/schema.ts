import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('GENERAL_REQUIRED')
    .matches(/^\S+@\S+$/, 'ERROR_INVALID_EMAIL'),
  password: yup.string().required('GENERAL_REQUIRED'),
  name: yup.string().required('GENERAL_REQUIRED'),
  username: yup.string().required('GENERAL_REQUIRED'),
});
