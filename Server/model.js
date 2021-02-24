const mongoose = require('mongoose');
const InquirySchema = new mongoose.Schema({
    orgName:{type:String, required:[true, "Required: Organization Name"]},
    orgAddress:{type:String, required:[true, "Required: Address"]},
    contactName:{type:String, required:[true, "Required: Name"]},
    contactEmail:{type:String, required:[true, "Required: Email"]},
    eventStart:{type:Date, required:[false]},
    eventEnd:{type:Date, required:[false]},
    numberOfEvents: Number,
    masterQuote:{type: Object, required:[false]},
},{ timestamps: true });
module.exports.Inquiry = mongoose.model('Inquiry', InquirySchema);