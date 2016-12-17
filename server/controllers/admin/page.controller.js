import Admin from '../../models/admin';
import Page from '../../models/page';

export function updatePage(req, res) {
  Page.update({ type: req.params.type }, req.body, function(err, page) {
    if (err){
      return res.status(500).send(err);
    }
      return res.json({ page });
  });
}

export function getPage(req, res) {
  Page.findOne({ type: req.params.type }).exec((err, page) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ page });
    }
  });
}

export function getPages(req, res) {
  Page.find().exec((err, page) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ page });
    }
  });
}
