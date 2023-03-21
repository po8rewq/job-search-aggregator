import Head from 'next/head';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import AppNavbar from './AppNavbar';

const Footer = styled.footer`
  margin: 20px 0;
  text-align: center;
  font-size: 12px;

  a svg {
    color: #000;
  }
`;

const AppContainer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>Job search aggregator</title>
      </Head>
      <AppNavbar />
      <main>
        <Container style={{ marginTop: '20px' }}>{children}</Container>
      </main>
      <Footer>
        Created by <Link href="https://revolugame.com">revolugame.com</Link>
        <br />
        Found an issue with this page? Fix it on{' '}
        <Link href="https://github.com/po8rewq/job-search-aggregator">
          GitHub
        </Link>
        .
      </Footer>
    </>
  );
};

export default AppContainer;
