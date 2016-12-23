import PurchaseOrder from '../models/purchaseorder';


export function addpurchaseOrder(req, res) {
  const newpurchaseOrder = new PurchaseOrder();
  newpurchaseOrder.shipping_city = "test"
  newpurchaseOrder.save((err, product) => {
        console.log(err)
        if (err) {
         return res.status(500).send(err);
        }
        else{
          return res.json({ product: product });;
        }
      // });
    })
}
