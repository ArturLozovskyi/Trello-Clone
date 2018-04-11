const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: String,
    card_id: String
});

module.exports = mongoose.model('task', taskSchema, 'tasks');