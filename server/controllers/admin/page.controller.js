import Admin from '../../models/admin';
import Page from '../../models/page';

export function updatePage(req, res) {
  Page.update({ _id: req.params._id }, req.body, function(err, page) {
    if (err){
      return res.status(500).send(err);
    }
      return res.json({ page });
  });
}

export function getPage(req, res) {
  Page.findOne({ _id: req.params._id }).exec((err, page) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ page });
    }
  });
}


export function getPages(req, res) {
  Page.find().sort('-dateAdded').exec((err, pages) => {
    if (err) {
      return res.status(500).send(err);
    }
    else{
      return res.json({ pages });
    }
  });
}
