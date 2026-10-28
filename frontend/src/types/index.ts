export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: string;
  categoria: string;
  stock: number;
  estado: 'activo' | 'inactivo';
  fecha_registro: string;
}

export interface Usuario {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  activo: boolean;
  is_staff: boolean;
}