const express = require('express');
const partnerRouter = express.Router();
const Partner = require('../models/partner');
const authenticate = require('../authenticate');
const cors = require('./cors');


partnerRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.find()
    .then(partners => res.status(200).json(partners))
    .catch(err => next(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.create(req.body)
    .then(partner => res.status(201).json(partner))
    .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.deleteMany()
    .then(partners => res.status(200).json(partners))
    .catch(err => next(err))
});

partnerRouter.route('/:partnerId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err))
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`Post not supported`);
})

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, req.body, { new: true})
    .catch(err => next(err))
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(partner => res.status(200).json(partner))
    .catch(err => next(err))
})


module.exports = partnerRouter;