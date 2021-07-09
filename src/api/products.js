const Product = require('../models/products');
const MongoCRUD = require('../repository/crud');

class ProductController {

    constructor() {
        //super(Product);
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
}

module.exports = new ProductController();