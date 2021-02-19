const mongoose = require('mongoose');
const QuoteSchema = new mongoose.Schema({
    organizationName:{type:String, required:[true, "Required: Organization Name"]},
    organizationAddress:{type:String, required:[true, "Required: Address"]},
    contactName:{type:String, required:[true, "Required: Name"]},
    contactEmail:{type:String, required:[true, "Required: Email"]},
    eventStart:{type:Date, required:[true, "Required: Start Date of Event"]},
    eventEnd:{type:Date, required:[true, "Required: End Date of Event"]},
    
    numberOfEvents:{type:Number},
    teir:{type:Number, required:[false]},
    feedback:{type:Number, default: 0},
    surveys:{type:Number, default: 0},
    sessions:{type:Number, default: 0},
    unlimited:{type:Number, default: 0},
    exhibit:{type:Number, default: 0},
    premiumFeatures:{type:Number, default: 0},
    careerFairTools:{type:Number, default: 0},
    artifact:{type:Number, default: 0},
    url:{type:Number, default: 0},
    manager:{type:Number, default: 0},
    video:{type:Number, default: 0},
    upload:{type:Number, default: 0},
    unlimitedUploading:{type:Number, default: 0},
    additional:{type:Number, default: 0},

},{ timestamps: true });
module.exports.Quote = mongoose.model('Quote', QuoteSchema);