let landingModel = require('../model/landing_model');
let dateUtils = require('../helpers/date')
let Bluebird = require('bluebird');


exports.test = () => {
    return landingModel.test()
}
