var mongoose = require('mongoose');

var GeneroSchema = new mongoose.Schema({
  nome: String,
  descricao: String
});

module.exports = mongoose.model('Genero', GeneroSchema);