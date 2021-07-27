import Landing from 'components/Landing';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import Faq from './Faq';

const FaqWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <Faq /> : <Landing />}</>;
};

export default FaqWrapper;
