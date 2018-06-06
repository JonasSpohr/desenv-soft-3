var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AvaliacaoSchema = new mongoose.Schema({
  serie: { type: Schema.ObjectId, ref: 'Serie' },
  usuario: { type: Schema.ObjectId, ref: 'User' },
  descricao: String,
  nota: Number,
  dataAvaliacao: Date
});

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);