var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var whatodo = new Schema({
    TaskName: String,
    TaskDate: String,
    TaskTime: String,
    TaskVenue: String,
    TaskPriority: {
        Type: String,
        enum: ["free", "Urgent!"]
    },
    TaskNote: String
});

var whatodo = mongoose.model('whatodo', whatodo);

module.exports = {
    whatodo: whatodo
}