let passport = require('passport');
let Strategy = require('passport-local').Strategy;
let userService = require('../service/user_service');

const LOCAL_STRATEGY_PROPERTIES = {
    passwordField: 'password',
    usernameField: 'username',
    passReqToCallback: true
};

const LOCAL_SIGNUP_STRATEGY = new Strategy(LOCAL_STRATEGY_PROPERTIES, userService.passportUserSignUp);
const LOCAL_LOGIN_STRATEGY = new Strategy(LOCAL_STRATEGY_PROPERTIES, userService.passportUserLogin);

const STRATEGY_NAMES = {
    login: 'local-login',
    signup: 'local-signup'
};

const AUTHENTICATE_PROCESS = {
    successRedirect: '/web/dispatcher/home',
    failureRedirect: '/web/login',
    failureFlash: true
};

const CUSTOMER_AUTHENTICATE_PROCESS = {
    successRedirect: '/customer/goals',
    failureRedirect: '/customer/',
    failureFlash: true
}

function isLoggedIn(req, res, next){
    if(req !== undefined && req !== null && req.isAuthenticated()){
        
        if (req.user.role == "guest") {
            console.log("opale eres un invitado prro")
            res.redirect('/customer/goals/');
        }
        next();
    }else{
        res.redirect('/web/login');
    }
}

function isLoggedInAsCustomer(req, res, next){
    if(req !== undefined && req !== null && req.isAuthenticated()){
        next();
    }else{
        res.redirect('/customer/');
    }
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    userService
        .findUserById(user.id)
        .then((rows) => done(null, rows[0]))
        .catch((err) => done(err));
});

passport.use(STRATEGY_NAMES.signup, LOCAL_SIGNUP_STRATEGY);
passport.use(STRATEGY_NAMES.login, LOCAL_LOGIN_STRATEGY);

exports.passport = passport;
exports.isLoggedIn = isLoggedIn;
exports.isLoggedInAsCustomer = isLoggedInAsCustomer
exports.loginAuthenticator = passport.authenticate(STRATEGY_NAMES.login, AUTHENTICATE_PROCESS);
exports.customerLoginAuthenticator = passport.authenticate(STRATEGY_NAMES.login, CUSTOMER_AUTHENTICATE_PROCESS)
exports.signUpAuthenticator = passport.authenticate(STRATEGY_NAMES.signup, AUTHENTICATE_PROCESS);