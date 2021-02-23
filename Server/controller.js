const {Inquiry} = require('./model.js')
module.exports.createInquiry = (request, response)=>{
    const{orgName,orgAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents,masterQuote} = request.body;
    Inquiry.create({orgName,orgAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents, masterQuote})
        .then(quote => response.json(quote))
        .catch(err => response.status(400).json(err));
}
module.exports.findAll = (request, response)=>{
    Inquiry.find({})
        .then(inquiry => response.json(inquiry))
        .catch(err => response.json(err));
}
module.exports.deleteInquiry = (request, response) => {
    Inquiry.findByIdAndDelete(request.params.id)
        .then(deleteInquiry => response(deleteInquiry))
        .catch(err => response.json(err));
}
module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}
module.exports.deleteAll = (request, response) => {
    Inquiry.deleteMany({})
    .then(deleteConfirmation => response.json(deleteConfirmation))
    .catch(err => response.json(err));
}