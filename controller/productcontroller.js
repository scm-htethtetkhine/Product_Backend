const db = require('../models').Product;

const getAllProducts = async (req , res) => {
  await db.findAll().then(products => {
    if(products.length > 0) {
      res.status(200).json(products);
    }
    else {
      res.status(404).json("No products found");
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const getByProductId = async (req, res) => {
  await db.findOne({ where: { id: req.params.id }})
  .then(product => {
    if ( product != null) {
      res.status(200).json(product);
    }else {
      res.status(404).json("No Products found");
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const addProduct = async (req , res) => {
  await db.findOne({ where: { 
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    qty: req.body.qty,
    brand: req.body.brand
  }})
  .then(product => {
    if (product != null) {
      res.status(400).json("Product already exists")
    } else {
      db.create(req.body).then(_ => {
        res.status(201).json("Product created successfully")
      })
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const editProduct = async (req , res) => {
  await db.findOne({ where: { id: req.params.id }})
  .then(product => {
    if ( product != null) {
      db.update(req.body, { where: { id: product.id }})
      .then(_ => res.status(200).json("Product updated Successfully"))
    } else {
      res.status(404).json("Product Not Found")
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

const deleteProduct = async (req , res) => {
  await db.findOne({ where: { id: req.params.id}})
  .then(product => {
    if (product != null) {
      db.destroy({ where: { id: req.params.id}})
      .then(_ => res.status(200).json("Product Delete Successfully"))
    } else {
      res.status(404).json("Product Not Found")
    }
  }).catch(err => {
    res.status(500).json("Error:" + err.message)
  })
}

module.exports = {
  getAllProducts,
  getByProductId,
  addProduct,
  editProduct,
  deleteProduct
}