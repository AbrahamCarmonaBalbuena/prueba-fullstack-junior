import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
            <Nav.Link as={Link} to="/reportes">Reportes</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}