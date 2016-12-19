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
  let end = parseInt(req.query._end, 10);
  let start = parseInt(req.query._start, 10);
  let sort = req.query._sort;
  let order = '';
  if (req.query._order == 'DESC'){
    order = 'descending';
  }
  if (req.query._order == 'ASC')
  {
    order = 'ascending';
  }
  Page.find().exec((err, total_pages) => {
    Page.find().sort([[sort, order]]).limit(end).skip(start).exec((err, pages) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.setHeader('X-Total-Count', pages.length);
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
      res.setHeader('X-Content-Type-Options', 'npsniff');
      res.json( pages );
      return;
    });
  });
}
