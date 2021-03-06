const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion')
const mongoose = require('mongoose');
const promotionRoute = express.Router();
var authenticate = require('../authenticate')
const cors = require('./cors')
promotionRoute.use(bodyParser.json());
promotionRoute.route('/')
.options(cors.corsWithOptions,(req,res) => res.statusCode(200))
.get(cors.cors,( req,res,next ) => {
    Promotion.find({})
    .then((promo) => {
    res.statusCode = 200
    res.setHeader('Content_Types', 'text/plain');
    res.json(promo);
    },(err) =>next(err));
})

.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin, (req , res, next) => {
    Promotion.create(req.body)
    .then((promo) => {
    res.statusCode = 200
    res.setHeader('Content_Types', 'text/plain');
    res.json(promo);
    },
    (err)=> next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 404;
    res.end('Put operation Not Supported on Promotion Route ');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotion.remove({})
    .then((promo) => {
    res.statusCode = 200
    res.setHeader('Content_Types', 'text/plain');
    res.json(promo);
    },(err) => next(err));
});


promotionRoute.route('/:promoId')
.options(cors.corsWithOptions,(req,res) => res.statusCode(200))
.get(cors.cors,(req,res,next) => {
    Promotion.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content_Type','application/json');
        res.json(promo);
    },(err) => next(err));
    
})

.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promo/'+ req.params.promoId);
})

.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
  Promotion.findByIdAndUpdate(req.params.promoId, { $set : req.body} , {new: true})
  .then((promo) => {
      res.statusCode = 200
      res.setHeader('Content_Type','application/json')
      res.json(promo);
  },(err) => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndRemove(req.params.promoId)
    .then((promo) => {
      res.statusCode = 200
      res.setHeader('Content_Type','application/json')
      res.json(promo);
    },(err) => next(err));
});


module.exports =    promotionRoute;
