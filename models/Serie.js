var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SerieSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  genero: { type: Schema.ObjectId, ref: 'Genero' },
  ano: Number,
  qtdTemporadas: Number,
  notaGeral: Number,
  usuario: { type: Schema.ObjectId, ref: 'User' },
  idadeRecomendada: Number,
  imagemCapa: String
});

module.exports = mongoose.model('Serie', SerieSchema);