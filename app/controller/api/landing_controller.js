let Router = require('express').Router;
let landingService = require('../../service/landing_service');

const ROUTER = Router();

/*
* Landing page
*/
ROUTER.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' })
});

ROUTER.post('/world', (req, res) => {
    console.log(req.body)
    res.send(`I received your POST request. This is what you sent me: ${req.body.post}`)
});

exports.router = ROUTER;