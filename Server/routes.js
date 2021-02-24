const InquiryController = require('./controller.js');
module.exports = function(app){
    app.get('/api/all', InquiryController.findAll);
    app.post('/api/create', InquiryController.createInquiry);
    app.delete('/api/delete/:id', InquiryController.deleteInquiry);
    app.get('/api', InquiryController.index);
    app.delete('/api/deleteAll', InquiryController.deleteAll);
    app.get('/api/inquiry/:id', InquiryController.getInquiryById);
}