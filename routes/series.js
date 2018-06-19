var express = require('express');
var async = require("async");
var router = express.Router();

var Serie = require('../models/Serie.js');
var Ator = require('../models/Ator.js');
var Avaliacao = require('../models/Avaliacao.js');

router.get('/all', async function(req, res, next) {
    Serie.find({}, async function(err, series) {
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

router.get('/filter/:titulo', async function(req, res, next) {
    Serie.find({ titulo: { $regex: new RegExp(req.params.titulo, "i") } }, async function(err, series) {
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

router.post('/', function(req, res, next) {
    var newSerie = new Serie(req.body);
    newSerie.save(function(err) {
        if (err) return res.send(JSON.stringify({ error: err }));
        res.send(JSON.stringify({ result: newSerie }));
    });
});

router.post('/addactor', function(req, res, next) {
    let newSerieActor = new Ator(req.body);
    newSerieActor.save(function(err) {
        if (err) return res.send(JSON.stringify({ error: err }));
        res.send(JSON.stringify({ result: newSerieActor }));
    });
});

router.post('/writecomment', function(req, res, next) {
    let newAvaliacao = new Avaliacao(req.body);
    newAvaliacao.save(function(err) {
        if (err) return res.send(JSON.stringify({ error: err }));
        res.send(JSON.stringify({ result: newAvaliacao }));
    });
});

router.get('/filter', function(req, res, next) {
});

router.get('/detail/:id', async function(req, res, next) {
    let serie = await Serie.findById(req.params.id);
    let atores = await Ator.find({ serie: req.params.id });
    res.send(JSON.stringify({ result: { detalhes: serie, atores: atores } }));
});

router.get('/allcomments/:id', async function(req, res, next) {
    let comentarios = await Avaliacao.find({ serie: req.params.id }).populate('usuario');
    res.send(JSON.stringify({ result: comentarios }));
});

router.get('/media/:id', async function(req, res, next) {
    let comentarios = await Avaliacao.find({ serie: req.params.id }).populate('usuario');

    let total = 0;
    for (let i = 0; i < comentarios.length; i++) {
        total += comentarios[i].nota;
    }

    if (total > 0)
        total = total / comentarios.length;

    if (total > 0) {
        let serie = await Serie.findById(req.params.id);
        serie.notaGeral = total.toFixed(1);
        await serie.save(function(err) {
            if (err) return res.send(JSON.stringify({ error: err }));
            res.send(JSON.stringify({ result: total }));
        });
    } else {
        res.send(JSON.stringify({ result: total }));
    }
});

module.exports = router;
