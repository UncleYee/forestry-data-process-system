const mongoose = require('mongoose');

const ForestrySchema = require('../lib/schemas/forestrySchema');
const Forestry = mongoose.model('Forestry', ForestrySchema);

module.exports = Forestry;