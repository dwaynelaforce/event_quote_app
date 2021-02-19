const {Quote} = require('./model.js')
module.exports.createQuote = (request, response)=>{
    const{organizationName,organizationAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents,teir,feedback,surveys,sessions,unlimited,exhibit,premiumFeatures,careerFairTools,artifact, url,manager,video,upload, unlimitedUploading,additional} = request.body;
    Quote.create({organizationName,organizationAddress,contactName,contactEmail,eventStart,eventEnd,numberOfEvents,teir,feedback,surveys,sessions,unlimited,exhibit,premiumFeatures,careerFairTools,artifact, url,manager,video,upload, unlimitedUploading,additional})
    .then(quote => response.json(quote))
    .catch(err => response.status(400).json(err));
}
module.exports.findAll = (request, response)=>{
    Quote.findAll({})
    .then(quote => response.json(quote))
    .catch(err => response.json(err));
}
module.exports.deleteQuote = (request, response) => {
    Pirate.deleteOne({_id:request.params.id})
    .then(deleteQuote => response(deleteQuote))
    .catch(err => response.json(err));
}