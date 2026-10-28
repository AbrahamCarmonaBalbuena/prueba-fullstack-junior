import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/');
        setStats(response.data);
      } catch (err) {
        setError('Error al cargar los datos del dashboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Resumen General</h2>
      <Row>
        <Col md={6} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total de Productos</Card.Title>
              <h1 className="display-4">{stats?.total_productos}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total de Usuarios</Card.Title>
              <h1 className="display-4">{stats?.total_usuarios}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}