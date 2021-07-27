import * as yup from 'yup';

export default yup.object().shape({
  username: yup.string().required('GENERAL_REQUIRED'),
  password: yup.string().required('GENERAL_REQUIRED'),
});
