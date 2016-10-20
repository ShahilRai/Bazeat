import Product from '../models/product';
import cuid from 'cuid';


export function addProduct(req, res) {
  const newproduct = new Product(req.body);
  newproduct.cuid = cuid();
  newproduct.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ product: saved });
  });
}


export function getProducts(req, res) {
  Product.find().sort('-dateAdded').exec((err, products) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ products });
  });
}


export function getProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ product });
  });
}


export function deleteProduct(req, res) {
  Product.findOne({ cuid: req.params.cuid }).exec((err, product) => {
    if (err) {
      res.status(500).send(err);
    }

    product.remove(() => {
      res.status(200).end();
    });
  });
}
