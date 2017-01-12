// import mongoose from 'mongoose';
// import autoIncrement from 'mongoose-auto-increment';
// import serverConfig from '../config';
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const connection = mongoose.createConnection(serverConfig.mongoURL);

// autoIncrement.initialize(connection);

// const purchaseorderSchema = new Schema({
//   status: { type: 'String',default: 'Received' },
//   packages: [{ type: Schema.ObjectId, ref: 'Package' }],
//   _order: { type: ObjectId, ref: 'Order' },
//   purchase_no: { type: Number, default: 0 },
//   shipping_no: { type: Number, default: 0 },
// });

// purchaseorderSchema.plugin(autoIncrement.plugin, { model: 'purchaseorderSchema', field: 'shipping_no'});
// purchaseorderSchema.plugin(autoIncrement.plugin, { model: 'purchaseorderSchema', field: 'purchase_no'});

// export default mongoose.model('PurchaseOrder', purchaseorderSchema);



