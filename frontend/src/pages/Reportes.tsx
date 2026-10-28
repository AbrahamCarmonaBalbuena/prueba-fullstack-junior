import { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Card } from 'react-bootstrap';
import api from '../services/api';

interface ReporteCategoria {
  categoria: string;
  cantidad: number;
  stock_total: number;
  valor_inventario: number;
}

export default function Reportes() {
  const [reporte, setReporte] = useState<ReporteCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReporte = async () => {
      try {
        const res = await api.get('/dashboard/');
        // Los datos vienen del endpoint del dashboard
        setReporte(res.data.reporte_categorias);
      } catch (err) {
        setError('Error al cargar el reporte.');
      } finally {
        setLoading(false);
      }
    };
    fetchReporte();
  }, []);

  // Formatear moneda MXN
  const formatMXN = (valor: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(valor);
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reporte de Inventario por Categoría</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Categoría</th>
                <th>Cantidad de Productos</th>
                <th>Stock Total</th>
                <th>Valor del Inventario</th>
              </tr>
            </thead>
            <tbody>
              {reporte.map((item, index) => (
                <tr key={index}>
                  <td className="fw-bold">{item.categoria}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.stock_total} unidades</td>
                  <td>{formatMXN(item.valor_inventario)}</td>
                </tr>
              ))}
              {reporte.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No hay productos activos registrados para generar el reporte.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}