const express = require('express');
const router = express.Router();
const controller = require('../api/messages');


// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Mensajes:
//  *       type: object
//  *       required:
//  *         - autor
//  *         - mensaje
//  *         - email
//  *         - fecha
//  *       properties:
//  *         autor:
//  *           type: string
//  *           description: "Nombre del autor del mensaje"
//  *         mensaje:
//  *           type: string
//  *           description: "Mensaje"
//  *         email:
//  *           type: string
//  *           description: "Correo electrónico"
//  *       example:
//  *         autor: "Soporte"
//  *         mensaje: "Hola!"
//  *         email: "soporte@soporte.cl"
//  *         fecha: "2021-07-09T06:09:06.613Z"
//  *
//  */



/**
 * @swagger
 * components:
 *   schemas:
 *     Mensaje:
 *       type: object
 *       example:
 *         autor: "Soporte"
 *         mensaje: "Hola soy un mensaje!"
 *         email: "soporte@soporte.cl"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MensajeResponse:
 *       type: object
 *       example:
 *         timestamp: "2021-07-09T06:16:30.402Z"
 *         _id: "60e7e9d298919318706ae0fa"
 *         autor: "Soporte"
 *         mensaje: "Hola soy un nuevo mensaje!"
 *         email: "soporte@soporte.cl"
 */

/**
 * @swagger
 *  /api/mensajes:
 *   get:
 *     tags: [Mensajes]
 *     summary: Retorna una lista de todos los mensajes
 *     responses:
 *       200:
 *         description: Retona una lista de todos los mensajes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MensajeResponse'
 */

router.get('/mensajes', async (req, res) => {
    try {
        let result = await controller.findAll();
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.get('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.findById(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});


/**
 * @swagger
 * /api/mensajes:
 *   post:
 *     summary: Crea un nuevo mensaje
 *     tags: [Mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Mensaje'
 *     responses:
 *       200:
 *         description: Registro almacenado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MensajeResponse'
 *       500:
 *         description: Some server error
 */
router.post('/mensajes', async (req, res) => {
    try {
        let result = await controller.create(req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

router.put('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.update(req.params.id, req.body);
        return res.json(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});


/**
 * @swagger
 * /api/mensajes/{id}:
 *   delete:
 *     summary: Elimina un mensaje por id
 *     tags: [Mensajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id mensaje
 *
 *     responses:
 *       200:
 *         description: Registro eliminado éxitosamente.
 *       404:
 *         description: No éxisten datos para eliminar.
 */
router.delete('/mensajes/:id', async (req, res) => {
    try {
        let result = await controller.delete(req.params.id);
        if (result != null) {
            return res.json({
              mensaje: "Registro eliminado éxitosamente",
              status: 200,
              data: result,
            });
          } else {
            return res.json({
              mensaje: "No éxisten datos para eliminar.",
              status: 404,
              data: result,
            });
          }
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;