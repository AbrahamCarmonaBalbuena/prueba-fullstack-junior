## React / TypeScrip
### 1. ¿Cual es la diferencia entre props y states?
R= Los props son datos queee un componente recibe desde su componente padre y no puede modificar por si mismo, son como los argumentos de una funcion. El state es informacion que el componente gestiona internamente y que puede cambiar con el tiempo, provocando que la interfaz se vuelva a redenrizarr.

### 2. ¿Para que sirve el hook useEddect y que es su arreglo de dependencias? Da un ejemplo de un useefect que se ejecute solo una vez al montar el componente.
R= useEffect sirve para ejecutar codigo que tiene peticiones a una API o suscripciones despues de que el componente se renderiza. El arreglo de dependencia le dice a React cuando debe volver a ejecutarse el eefecto, es el arreglo esta vacio, solo se ejecuta una vez al montar componente.

### 3. Es una lista renderizada con .map(), ¿Porque es importante la prop key?
R= La key le da a React una identidad unica a cada elemento de la lista. Gracias a ella, React puede saber que elemento se agrego, elimino o reordeno sin tener que volver a rrenderizar toda la lista, evitando errrores visuales y mejorando el rendimiento.

### 4. ¿Que diferencia hay entre un componente controlado y uno no controlado al manejar formularios?
R= En un componente controlado, React es el dueño del valor del campo y el formulario se actualiza cada vez que el usuario escribe. En uno no contrrolado, el valor vive directamente en el DOM y se obtiene con una ref solo cuando es necesario.

## Django / DRF
### 5. En Django REST Framework, explica con tus palabras que hace un Serializer y que hace un ViewSet
R= Un Serializer convierte objetos complejos a formatos JSON y viceversa, ademas de validar los datos quee llegan. Un ViewSet agrupa la logica de las operaciones CRUD en una sola clase, con un Router genera automaticamente las URLs para esas acciones.

### 6. ¿Que es una migracion en Django y porque no editamos la base de datos a mano?
R= Una migracion es una archivo que describe los cambios en la estructura de la base de datos y que Django aplica de forma controladas y versionada. no editamos a mano porque perderiamos el historial dee cambios, la reproducibilidad y la capacidad de que otros desarrolladores tengan la misma estructura exacta.

### 7. ¿Cual es la diferencia entre los metodos HTTP PUT y PATCH?
R= PUT se usa para reemplazar un recurso completo, si envias solo un campo, los demas se pierden o deben enviarse tambien. PATCH se usa para modificar solo una parte del recurso, enviando unicamente los campos que cambian, lo que ahorra datos y es mas flexible.

## Autenticacion / JWT
### 8. Explica a grandes rasgos como funciona la autenticacion con JWT: que recibe el cliente al iniciar sesion, donde lo guarda y como lo usa en la siguientes peticiones. ¿Porque no conviene guardar informacion sensible del token?
R= Al iniciar sesion, el servidor devuelve un token JWT. El cliente lo guarda y en cada peticion posterior lo envia en el header. No conviene guardar informacion sensible dentro del token porque su contenido es visible para cualquiera que intercepte, solo debe llevar datos de identificacion no confidenciales.

### 9. escribe una consulta SQL que devuelva, por categoria, la cantidad de productos y la suma de stock, considerando solo productos activos, ordenada de mayor a menor cantidad.
R= SELECT categoria, COUNT(*) AS cantidad_productos, SUM(stock) AS suna_stock
FROM producto
WHERE estado = 'activo'
GROUP BY categoria
ORDER BY cantidad_productos DESC;

### 10. ¿Que es un indice en una base de datos y porque NO conviene ponerle indice a todas las columnas?
R= Un indice es una estrcutura que acelera las busquedas en una columna, similar al indice de un libro. No conviene ponerlo en todas las columnas porque cada indice ocupa espacio en disco y hace mas lenta la escritura, ya que la base de datos debe actualizar tambien el indice.

## Integracion / general
### 11. A alto nivel, ¿Como se comunica un frontend de React con una API REST? Menciona que es CORS y porque suele aparecer al conectar React (localhost:5173) con Django (localhost:8000).
R= React hace peticiones HTTP a las URLs de la API y recibe respuestas en JSON. CORS es una politica de seguridad del navegador que bloquea peticiones entre distintos origenes. Aparece porque el navegador considera que distintos puertas son origenes diferente, y el backend debe configurar django-cors-headers para permitirlo explicitamente.