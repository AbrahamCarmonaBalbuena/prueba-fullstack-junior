# Prueba Técnica - Desarrollador Full Stack Junior

Plataforma web para administrar un catálogo de productos, con autenticación de usuarios, panel administrativo (dashboard), administración de usuarios y generación de reportes.

## Tecnologías Utilizadas
- **Backend:** Python, Django, Django REST Framework, PostgreSQL, SimpleJWT.
- **Frontend:** React, TypeScript, Vite, Bootstrap, Axios, React Router.
- **Autenticación:** JWT (JSON Web Tokens).

## Requisitos Previos
- Python 3.10 o superior.
- Node.js 20 o superior.
- PostgreSQL 15 o superior instalado y corriendo.

## Instalación y Ejecución Local

# 1. Backend (Django + PostgreSQL)

## 1. Abre una terminal y ve a la carpeta del backend:
    cd backend

## 2. Crea y activa un entorno vitual
     python -m venv venv
## En Windows:
    venv\Scripts\activate

## 3. Instala las dependencias:
    pip install django djangorestframework djangorestframework-simplejwt psycopg2-binary django-cors-headers python-decouple

## 4. Crea un archivo .env en la carpeta backend con las credenciales de tu base de datos PostgreSQL:
    SECRET_KEY=tu_clave_secreta_aqui
    DEBUG=True
    DB_NAME=prueba_fullstack
    DB_USER=postgres
    DB_PASSWORD=tu_contraseña_de_postgres
    DB_HOST=localhost
    DB_PORT=5432

## 5. Aplica las migraciones:
    python manage.py migrate

## 6. Inicia el servidor:
    python manage.py runserver
(El backend estara disponible en http://localhost:8000)

# 2 Frontend(React + TypeScript)
## 1. Abra otra terminal (deja el backend corriendo) y ve a la carpeta del frontend:
    cd frontend
## 2. Instala las dependencias:
    npm install --legacy-peer-deps
## 3. Crea un archivo llamado .env en la carpeta frontend con la URL de la API:
    VITE_API_URL=http://localhost:8000/api
## 4. Inicia el servidor de desarrollo:
    npm run dev
(El frontend estará disponible en http://localhost:5173)
