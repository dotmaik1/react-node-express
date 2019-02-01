let Router = require('express').Router;
let usersRouter = require('./user_controller').router;
let landingRouter = require('./landing_controller').router;

const router = Router();
router.use('/users', usersRouter);
router.use('/landing', landingRouter);

exports.router = router;
