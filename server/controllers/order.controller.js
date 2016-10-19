import Order from '../models/order';
import cuid from 'cuid';

export function addOrder(req, res) {
  const newOrder = new Order(req.body);
  newOrder.cuid = cuid();
  newOrder.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ order: saved });
  });
}


export function getOrders(req, res) {
  Order.find().sort('-dateAdded').exec((err, orders) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ orders });
  });
}


export function getOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ order });
  });
}


export function deleteOrder(req, res) {
  Order.findOne({ cuid: req.params.cuid }).exec((err, order) => {
    if (err) {
      res.status(500).send(err);
    }

    order.remove(() => {
      res.status(200).end();
    });
  });
}
