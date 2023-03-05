import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppNavbar() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.push('/');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Job search</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Link href="/app/dashboard" legacyBehavior passHref>
              <Nav.Link>Dashboard</Nav.Link>
            </Link>
            <Link href="/app/jobs" legacyBehavior passHref>
              <Nav.Link>Jobs</Nav.Link>
            </Link> */}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
