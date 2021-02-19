const {Inquiry} = require('./model.js')
module.exports.createInquiry = (request, response)=>{
    const{organizationName,organizationAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents,teir,feedback,surveys,sessions,unlimited,exhibit,premiumFeatures,careerFairTools,artifact, url,manager,video,upload, unlimitedUploading,additional} = request.body;
    Inquiry.create({organizationName,organizationAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents,teir,feedback,surveys,sessions,unlimited,exhibit,premiumFeatures,careerFairTools,artifact, url,manager,video,upload, unlimitedUploading,additional})
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