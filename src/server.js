const express = require('express');
const app = express();
const config = require('./config/config.json');
const dotenv = require('dotenv');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


require('./database/connection');

// obtengo la config del .env
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//INCORPORACIÓN DE SWAGGER API
//swagger extended: https://swagger.io/specification/#info0bject
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: process.env.PATHSWAGGER || "http://localhost:8080",
			},
		],
	},
    apis: ["src/routes/*.js"],
};

const specs = swaggerJsDoc(options);



// protejo el servidor ante cualquier excepcion no atrapada
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send('Algo se rompio!');
});
app.use('/', express.static(__dirname + '/public'));
app.use('/api', require('./routes/messages'));
app.use('/api', require('./routes/products'));

//MIDDLEWARE SWAGGER
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// obtengo el puerto del enviroment o lo seteo por defecto
const PORT = process.env.PORT || config.PORT;

// pongo a escuchar el servidor en el puerto indicado
const server = app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}/api-docs`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
