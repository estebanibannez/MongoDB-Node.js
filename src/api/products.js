const Product = require("../models/products");
const MongoCRUD = require("../repository/crud");
const faker = require("faker");
faker.locale = "es_MX";
class ProductController {
  constructor() {
    //super(Product);
    this.productosMock = [];
  }

  async findAll() {
    return await Product.find({});
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }

  generateProductMock() {
    return {
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      precio: faker.finance.amount(2000,10000),
      descripcion: faker.commerce.productDescription(),
      code: faker.commerce.productMaterial(),
      image: faker.image.business(),
      stock: faker.random.number({
        'min': 10,
        'max': 50
      }),
    };
  }

  findAllFakerData(cant) {
    this.productosMock = [];
    for (let i = 0; i < cant; i++) {
      this.productosMock.push(this.generateProductMock());
    }

    return this.productosMock;
  }
}

module.exports = new ProductController();
