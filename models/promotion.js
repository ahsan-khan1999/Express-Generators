const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
    name : {
        type:String,
        required:true
    },
    image : {
        type:String,
        required:true
    },
    label : {
        type:String,
        default:''
    },
    price: {
        type:Currency,
        min:1,
        required:true
    },
    description : {
        type:String,
        required:true
    },
    featured : {
        type:Boolean,
        default:false
    }
});

var Promotion = mongoose.model('promotion',promotionSchema);
module.exports = Promotion; 