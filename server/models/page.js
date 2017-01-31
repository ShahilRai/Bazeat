import mongoose from 'mongoose';
mongoose.plugin(require('meanie-mongoose-to-json'));
const Schema = mongoose.Schema;


const pageSchema = new Schema({
  type: { type: 'String', required: true },
  description: { type: 'String'},
  date_added: { type: 'Date', default: Date.now, required: true }},
  { timestamps: true }
);

export default mongoose.model('Page', pageSchema);

var Page = mongoose.model('Page', pageSchema);
var validator = function (value) {
  console.log(value)
      return /Help|About|Terms|Privacy|FAQ/.test(value);
    };

Page.schema.path('type').validate(validator,
      'Type `{VALUE}` not valid', 'Invalid page type');

