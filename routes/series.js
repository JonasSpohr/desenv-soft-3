var express = require('express');
var async = require("async");
var router = express.Router();

var Serie = require('../models/Serie.js');
var Ator = require('../models/Ator.js');

router.get('/all', async function (req, res, next) {
  let seriesReturn = [];
  Serie.find({}, async function (err, series) {
    if (err) return next(err);

    if (series === null)
      return res.send(JSON.stringify({ result: [] }));

    let objReturn = [];

    for (let i = 0; i < series.length; i++) {
      let atores = await Ator.find({ serie: series[i]._id });
      objReturn.push(
       { atores: atores, detalhes: series[i] }
      );
    }

    res.send(JSON.stringify({ result: objReturn }));
  }).populate('genero');
});

router.post('/', function (req, res, next) {
  var newSerie = new Serie(req.body);
  newSerie.save(function (err) {
    if (err) return res.send(JSON.stringify({ error: err }));
    res.send(JSON.stringify({ result: newSerie }));
  });
});

router.post('/addactor', function (req, res, next) {
  let newSerieActor = new Ator(req.body);
  newSerieActor.save(function (err) {
    if (err) return res.send(JSON.stringify({ error: err }));
    res.send(JSON.stringify({ result: newSerieActor }));
  });
});

router.get('/filter', function (req, res, next) {
});

module.exports = router;
