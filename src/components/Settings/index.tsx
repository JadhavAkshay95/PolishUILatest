import Landing from 'components/Landing';
import { useAuthenticationContext } from 'context/AuthenticationContext';
import Setting from './Settings';

const SettingWrapper = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return <>{isAuthenticated ? <Setting /> : <Landing />}</>;
};

export default SettingWrapper;
