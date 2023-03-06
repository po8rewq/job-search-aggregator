import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { Github } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import AppNavbar from './AppNavbar';

const Footer = styled.footer`
  margin-top: 20px;
  text-align: center;
  font-size: 12px;

  a svg {
    color: #000;
  }
`;

const AppContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <header>
        <AppNavbar />
      </header>
      <main>
        <Container style={{ marginTop: '20px' }}>{children}</Container>
      </main>
      <Footer>
        Created by <Link href="https://revolugame.com">revolugame.com</Link> |{' '}
        <Link href="https://github.com/po8rewq/job-search-aggregator">
          <Github />
        </Link>
      </Footer>
    </>
  );
};

export default AppContainer;
