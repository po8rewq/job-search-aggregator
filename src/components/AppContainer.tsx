import { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import AppNavbar from './AppNavbar';

const AppContainer = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <AppNavbar />
      <Container style={{ marginTop: '20px' }}>{children}</Container>
    </div>
  );
};

export default AppContainer;
