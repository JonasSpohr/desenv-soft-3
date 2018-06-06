var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AtorSchema = new mongoose.Schema({
  serie: { type: Schema.ObjectId, ref: 'Serie' },
  nome: String,
  personagem: String
});

module.exports = mongoose.model('Ator', AtorSchema);