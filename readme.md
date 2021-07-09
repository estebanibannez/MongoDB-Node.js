### Base de datos del proyecto
Este sistema utiliza la base de datos mongodb. Para crearla se debe realizar lo siguiente, con el comando mongo:

1.-
### crear bd ecommerce
 use ecommerce
2.-
### crear colecciones producto y mensaje
db.createCollection("mensajes");
db.createCollection("productos");

3.-
### insertar documentos a coleccion mensajes
db.mensajes.insert([
  {
    autor: "Soporte",
    mensaje: "Hola!",
    email: "soporte@soporte.cl",
    timestamp: new Date(),
  },
  {
    autor: "Usuario",
    mensaje: "Hola, como estás?!",
    email: "usuario@usuario.com",
    timestamp: new Date(),
  },
  {
    autor: "Soporte",
    mensaje: "en que puedo ayudar?",
    email: "soporte@soporte.cl",
    timestamp: new Date(),
  },
]);
### insertar documentos a coleccion productos
db.productos.insert([
  {
    nombre: "Producto test 1",
    descripcion: "Descripción producto 1",
    codigo: "1234",
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    precio: 1000,
    stock: 10
  },
  {
    nombre: "Producto test 2",
    descripcion: "Descripción producto 2",
    codigo: "12345",
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    precio: 2000,
    stock: 20
  },
  {
    nombre: "Producto test 3",
    descripcion: "Descripción producto 3",
    codigo: "123456",
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    precio: 3000,
    stock: 30
  },
]);

### Proyecto con Swagger / URL para revisar los endpoints
http://localhost:8080/api-docs/