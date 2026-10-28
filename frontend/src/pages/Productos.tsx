import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import api from '../services/api';
import type { Producto } from '../types';

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Estados para el Modal (Crear/Editar)
  const [showModal, setShowModal] = useState(false);
  const [productoActual, setProductoActual] = useState<Partial<Producto>>({
    nombre: '', descripcion: '', precio: '', categoria: '', stock: 0, estado: 'activo'
  });

  // Función para cargar los productos
  const fetchProductos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/productos/');
      setProductos(res.data.results); // DRF devuelve los datos paginados en 'results'
    } catch (err) {
      setError('Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Formatear precio a MXN
  const formatMXN = (precio: string | number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(precio));
  };

  // Guardar (Crear o Editar)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (productoActual.id) {
        await api.put(`/productos/${productoActual.id}/`, productoActual);
      } else {
        await api.post('/productos/', productoActual);
      }
      setShowModal(false);
      fetchProductos();
    } catch (err: any) {
      alert('Error al guardar. Revisa que el precio sea > 0 y el stock >= 0.');
    }
  };

  // Eliminar
  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}/`);
        fetchProductos();
      } catch (err) {
        alert('Error al eliminar');
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listado de Productos</h2>
        <Button variant="success" onClick={() => { setProductoActual({ nombre: '', descripcion: '', precio: '', categoria: '', stock: 0, estado: 'activo' }); setShowModal(true); }}>
          + Nuevo Producto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.categoria}</td>
              <td>{formatMXN(prod.precio)}</td>
              <td>{prod.stock}</td>
              <td>
                <span className={`badge bg-${prod.estado === 'activo' ? 'success' : 'danger'}`}>
                  {prod.estado}
                </span>
              </td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => { setProductoActual(prod); setShowModal(true); }}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(prod.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr><td colSpan={7} className="text-center">No hay productos registrados</td></tr>
          )}
        </tbody>
      </Table>

      {/* Modal para Crear/Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{productoActual.id ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control required value={productoActual.nombre} onChange={(e) => setProductoActual({...productoActual, nombre: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control required value={productoActual.categoria} onChange={(e) => setProductoActual({...productoActual, categoria: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" step="0.01" min="0.01" required value={productoActual.precio} onChange={(e) => setProductoActual({...productoActual, precio: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" min="0" required value={productoActual.stock} onChange={(e) => setProductoActual({...productoActual, stock: Number(e.target.value)})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={productoActual.estado} onChange={(e) => setProductoActual({...productoActual, estado: e.target.value as 'activo' | 'inactivo'})}>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}