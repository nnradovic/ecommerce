const User = require('../models/user');
const jwt = require('jsonwebtoken'); // da geneerise token za signin
const expressJwt = require('express-jwt'); // za autorizaciju
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined // da ne vraca u responsu user pass i salt
        res.json({
            user
        })
    })
}



exports.signin = (req, res) => {
    //nadji usera na osnovu email
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist, Please signup'
            })
        }

        // ako e user nadjen maora da se matuju email i password
        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        // generisei signed token sa user id i secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        // napraviti token sa t u cookie sa expiry date
        res.cookie('t', token, { expire: new Date() + 9999 })
        //vrati response sa userom i tokenom frontendu
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, email, name, role } })
    })
}


exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: "Signout sucess" })
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth" //to je ovo dole req.auth
})// middleware koji sluzi da authetikujes neku rutu koju zelis da vidi samo logovan user.



exports.isAuth = (req, res, next) => {

    let user = req.profile && req.auth && (req.profile._id == req.auth._id)  // da li imas profil, da li si autorizovan-logovan, da li se id poklapa.

    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        })
    }

    next()
};//middleware da vidimo da li si authorizovan da vidis neku rutu npr profil drugog korisnika, 

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resource! Acess denied'
        })
    }
    next()
}//middleware da vidimo da li si admin to je role 1.
