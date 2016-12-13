import Producer from '../models/producer';
import cuid from 'cuid';

export function addProducer(req, res) {
  const newproducer = new Producer(req.body);
  newproducer.cuid = cuid();
  newproducer.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    else {
     return res.json({ producer: saved });
    }
  });
}


export function getProducers(req, res) {
  Producer.find().sort('-dateAdded').exec((err, producers) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ producers });
    }
  });
}


export function getProducer(req, res) {
  Producer.findOne({ cuid: req.params.cuid }).exec((err, producer) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ producer });
    }
  });
}


export function deleteProducer(req, res) {
  Producer.findOne({ cuid: req.params.cuid }).exec((err, producer) => {
    if (err) {
      return res.status(500).send(err);
    }

    producer.remove(() => {
      res.status(200).end();
    });
  });
}
