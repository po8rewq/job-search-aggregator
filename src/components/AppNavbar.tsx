import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';

const CustomNavbar = styled(Navbar).attrs({ expand: 'lg' })`
  background-color: #fff;
  transition: all 0.5s;
  box-shadow: 0px 2px 20px rgb(1 41 112 / 10%);
`;

const AppNavbar = () => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };
  return (
    <CustomNavbar>
      <Container>
        <Navbar.Brand>Lets find some job</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/app/jobs" legacyBehavior passHref>
              <Nav.Link>Jobs</Nav.Link>
            </Link>
            <Link href="/app/search" legacyBehavior passHref>
              <Nav.Link>Job searches</Nav.Link>
            </Link>
            {/* <Link href="/app/settings" legacyBehavior passHref>
              <Nav.Link>Settings</Nav.Link>
            </Link> */}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </CustomNavbar>
  );
};

export default AppNavbar;
