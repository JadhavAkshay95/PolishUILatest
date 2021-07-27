import * as yup from 'yup';

export default yup.object().shape({
  amount: yup.string().required('GENERAL_REQUIRED'),
  send_to: yup.string().required('GENERAL_REQUIRED'),
  reference: yup.string().required('GENERAL_REQUIRED'),
});
