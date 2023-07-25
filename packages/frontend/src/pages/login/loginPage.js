import { LoginForm } from '../../components/login/login';
import { Container } from '@mui/material';

import { selectError } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';
import { NotifyError } from '../../components/errNotifications/errNotify';

export default function LoginPage() {
  const error = useSelector(selectError);

  const shouldShowError =  error !== null;

  return (
    <>
      <Container fixed>
        <LoginForm />
      </Container>
      {shouldShowError ? <NotifyError error={error} /> : null}
    </>
  );
}
