var express = require('express');
var router = express.Router();

var Genero = require('../models/Genero.js');

router.post('/', function (req, res, next) {
  let newGender = new Genero(req.body);
  newGender.save(function (err) {
    if (err) return res.send(JSON.stringify({ error: err }));
    res.send(JSON.stringify({ result: newGender }));
  });
});

module.exports = router;
