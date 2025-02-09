const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const stringCapitalizeName = require("string-capitalize-name");

const Propriedade = require("../models/modelos");

// Attempt to limit spam post requests for inserting data
const minutes = 5;
const postLimiter = rateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs
  delayMs: 0, // Disable delaying - full speed until the max limit is reached
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      msg: `You made too many requests. Please try again after ${minutes} minutes.`,
    });
  },
});

// READ (ONE)
router.get("/:id", (req, res) => {
  Propriedade.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such Propriedade.` });
    });
});

// READ (ALL)
router.get("/", (req, res) => {
  Propriedade.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post("/", postLimiter, (req, res) => {
  let newPropriedade = new Propriedade({
    propertyType: req.body.propertyType,
    quartos: req.body.quartos,
    suites: req.body.suites,
    salasEstar: req.body.salasEstar,
    vagasGaragem: req.body.vagasGaragem,
    area: req.body.area,
    armarioEmbutido: req.body.armarioEmbutido,
    descricao: req.body.descricao,
    foto: req.body.foto,
    andar: req.body.andar,
    valorCondominio: req.body.valorCondominio,
    portaria24h: req.body.portaria24h,
    bairro: req.body.bairro,
    valor: req.body.valor,
  });

  newPropriedade
    .save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          propertyType: result.propertyType,
          quartos: result.quartos,
          suites: result.suites,
          salasEstar: result.salasEstar,
          vagasGaragem: result.vagasGaragem,
          area: result.area,
          armarioEmbutido: result.armarioEmbutido,
          descricao: result.descricao,
          foto: result.foto,
          andar: result.andar,
          valorCondominio: result.valorCondominio,
          portaria24h: result.portaria24h,
          bairro: result.bairro,
          valor: result.valor,
        },
      });
    })
    .catch((err) => {
      if (err.errors) {
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put("/:id", (req, res) => {
  let updatedPropriedade = {
    propertyType: req.body.propertyType,
    quartos: req.body.quartos,
    suites: req.body.suites,
    salasEstar: req.body.salasEstar,
    vagasGaragem: req.body.vagasGaragem,
    area: req.body.area,
    armarioEmbutido: req.body.armarioEmbutido,
    descricao: req.body.descricao,
    foto: req.body.foto,
    andar: req.body.andar,
    valorCondominio: req.body.valorCondominio,
    portaria24h: req.body.portaria24h,
    bairro: req.body.bairro,
    valor: req.body.valor,
  };
  Propriedade.findOneAndUpdate({ _id: req.params.id }, updatedPropriedade, {
    runValidators: true,
    context: "query",
  })
    .then((oldResult) => {
      Propriedade.findOne({ _id: req.params._id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              propertyType: newResult.propertyType,
              quartos: newResult.quartos,
              suites: newResult.suites,
              salasEstar: newResult.salasEstar,
              vagasGaragem: newResult.vagasGaragem,
              area: newResult.area,
              armarioEmbutido: newResult.armarioEmbutido,
              descricao: newResult.descricao,
              foto: newResult.foto,
              andar: newResult.andar,
              valorCondominio: newResult.valorCondominio,
              portaria24h: newResult.portaria24h,
              bairro: newResult.bairro,
              valor: newResult.valor,
            },
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        res
          .status(500)
          .json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  Propriedade.findByIdAndRemove(req.params._id)
    .then((newResult) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: newResult._id,
          propertyType: newResult.propertyType,
          quartos: newResult.quartos,
          suites: newResult.suites,
          salasEstar: newResult.salasEstar,
          vagasGaragem: newResult.vagasGaragem,
          area: newResult.area,
          armarioEmbutido: newResult.armarioEmbutido,
          descricao: newResult.descricao,
          foto: newResult.foto,
          andar: newResult.andar,
          valorCondominio: newResult.valorCondominio,
          portaria24h: newResult.portaria24h,
          bairro: newResult.bairro,
          valor: newResult.valor,
        },
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: "Nothing to delete." });
    });
});

module.exports = router;
