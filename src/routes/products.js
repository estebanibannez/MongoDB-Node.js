const express = require("express");
const router = express.Router();
const controller = require("../api/products");

/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseSuccess:
 *       example:
 *        status: 200
 *        message: Registro almacenado con éxito.
 *        data:
 *         _id: 6030ac97f2974445947f3355
 *         nombre: Producto 5
 *         descripcion: "descripcion producto 5"
 *         precio: 5000
 *         codigo: 11111111
 *         foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle..."
 *         stock: 10
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ResponseSuccessUpdate:
 *       example:
 *        status: 204
 *        message: Registro actualizado con éxito.
 *        data:
 *         _id: 6030ac97f2974445947f3355
 *         nombre: Producto 5
 *         descripcion: "descripcion producto actualizado"
 *         precio: 1020304
 *         codigo: 1000
 *         foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle..."
 *         stock: 20
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *       properties:
 *         nombre:
 *           type: string
 *           description: "Nombre del producto"
 *         descripcion:
 *           type: string
 *           description: "Descripción del producto"
 *       example:
 *         nombre: Producto Actualizado
 *         descripcion: "descripcion producto actualizado!"
 *         codigo: 01020304
 *         precio: 1000
 *         foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle..."
 *         stock: 20
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Productos:
 *       example:
 *         _id: 6030ac97f2974445947f3355
 *         nombre: Producto 5
 *         descripcion: "descripcion producto 5"
 *         codigo: 11111111
 *         precio: 5000
 *         foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle..."
 *         stock: 10
 *
 */

/**
 * @swagger
 *  /api/productos:
 *   get:
 *     tags: [Productos]
 *     summary: Retorna un listado de todos los productos
 *     responses:
 *       200:
 *         description: Retona una lista de todos los productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Productos'
 */
router.get("/productos", async (req, res) => {
  try {
    let result = await controller.findAll();
    return res.json(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Permite buscar un producto por su id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Indique un id
 *     responses:
 *       200:
 *         description: Devuelve solo un producto por su id.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productos'
 */

router.get("/productos/:id", async (req, res) => {
  try {
    let result = await controller.findById(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     PostProducto:
 *       type: object
 *       example:
 *         nombre: Producto TEST
 *         descripcion: "descripcion producto TEST"
 *         codigo: 11223344
 *         precio: 10000
 *         foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle..."
 *         stock: 010101
 *
 */

/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostProducto'
 *     responses:
 *       200:
 *         description: Registro almacenado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseSuccess'
 *       500:
 *         description: Some server error
 */
router.post("/productos", async (req, res) => {
  try {
    let result = await controller.create(req.body);
    return res.json({
      status: 200,
      Mensaje: "El producto fue creado con éxito",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *  put:
 *    summary: Actualiza un producto
 *    tags: [Productos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: id producto
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Producto'
 *    responses:
 *      204:
 *        description: Registro actualizado con éxito.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseSuccessUpdate'
 */

router.put("/productos/:id", async (req, res) => {
  try {
    let result = await controller.update(req.params.id, req.body);
    return res.json({
      mensaje: "Registro actualizado con éxito",
      status: 204,
      data: result,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por id
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id producto
 *
 *     responses:
 *       200:
 *         description: Registro eliminado con éxito.
 *       404:
 *         description: No éxisten datos para eliminar.
 */

router.delete("/productos/:id", async (req, res) => {
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
