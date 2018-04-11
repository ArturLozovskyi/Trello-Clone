const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({
    name: String
});

module.exports = mongoose.model('card', cardSchema, 'cards');