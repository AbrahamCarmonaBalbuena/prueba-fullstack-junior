import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import api from '../services/api';
import type { Usuario } from '../types';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Estado para el formulario
  const [usuarioActual, setUsuarioActual] = useState<Partial<Usuario> & { password?: string }>({
    username: '', email: '', first_name: '', last_name: '', activo: true, password: ''
  });

  const fetchUsuarios = async () => {
    try {
      setLoading(true);
      const res = await api.get('/usuarios/');
      setUsuarios(res.data.results);
    } catch (err) {
      alert('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (usuarioActual.id) {
        // Editar (no mandamos password en la edición)
        const { password, ...dataToUpdate } = usuarioActual;
        await api.put(`/usuarios/${usuarioActual.id}/`, dataToUpdate);
      } else {
        // Crear (usamos el endpoint de registro que ya teníamos)
        await api.post('/registro/', usuarioActual);
      }
      setShowModal(false);
      fetchUsuarios();
    } catch (err: any) {
      alert('Error al guardar el usuario. Verifica que el nombre de usuario no exista.');
    }
  };

  const handleDesactivar = async (id: number) => {
    if (window.confirm('¿Seguro que deseas desactivar este usuario?')) {
      try {
        await api.delete(`/usuarios/${id}/`);
        fetchUsuarios(); // Recargamos la tabla
      } catch (err) {
        alert('Error al desactivar');
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Usuarios</h2>
        <Button variant="success" onClick={() => { setUsuarioActual({ username: '', email: '', first_name: '', last_name: '', activo: true, password: '' }); setShowModal(true); }}>
          + Nuevo Usuario
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Nombre Completo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name} {user.last_name}</td>
              <td>
                <span className={`badge bg-${user.activo ? 'success' : 'secondary'}`}>
                  {user.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => { setUsuarioActual(user); setShowModal(true); }}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDesactivar(user.id)} disabled={!user.activo}>
                  Desactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Crear/Editar */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{usuarioActual.id ? 'Editar Usuario' : 'Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSave}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control required value={usuarioActual.username} disabled={!!usuarioActual.id} onChange={(e) => setUsuarioActual({...usuarioActual, username: e.target.value})} />
            </Form.Group>
            {!usuarioActual.id && (
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" required value={usuarioActual.password} onChange={(e) => setUsuarioActual({...usuarioActual, password: e.target.value})} />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={usuarioActual.email} onChange={(e) => setUsuarioActual({...usuarioActual, email: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={usuarioActual.first_name} onChange={(e) => setUsuarioActual({...usuarioActual, first_name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control value={usuarioActual.last_name} onChange={(e) => setUsuarioActual({...usuarioActual, last_name: e.target.value})} />
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