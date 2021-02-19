const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/whova", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Mongo database connection ... SUCCESS"))
    .catch(err => console.log("Mongo database connection ... FAILED", err));