import Product from '../models/product';
import User from '../models/user';
import cuid from 'cuid';

export function addProduct(req, res) {
  User.findOne({  email: req.body.email }).exec((error, user) => {
    const newproduct = new Product(req.body);
    newproduct.cuid = cuid();
    newproduct._producer = user._id;
    newproduct.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      user.products.push(saved);
      user.save((error, user) => {
        if (error) {
          res.status(500).send(error);
        }
        res.json({ product: saved });
      });
    });
  });
}


export function purchaseProduct(req, res) {
  Product.findOne({ cuid: req.body.cuid }).exec((err, product) =>{
    User.findOne({ email: req.body.email}).exec((err, user) => {
        product.buyers.push(user);
        product.save((err, product1) => {
          if (err) {
            res.status(500).send(err);
          }
        res.json({ product: product1 });
        });
    });
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


export function getBuyers(req, res) {
  Product.findOne({ cuid: req.params.cuid }).populate('buyers _producer').exec((err, buyers) => {
    if (err) {
      res.status(500).send(err);
    }
      res.json({ product: buyers });
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
