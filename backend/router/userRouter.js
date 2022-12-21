const express = require('express');
const UserRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let userModels = require('../models/userModels');

//Create user
UserRoute.route('/create-user').post((req, res, next) => {
    const newUsers = new userModels({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12)
    })
    newUsers.save(err => {
        if (err) {
            return res.status(400).json({
                title: 'error',
                error: 'Email in used'
            })
        }
        return res.status(200).json({
            title: 'signup success',
        })
    })
    console.log(newUsers);
})

UserRoute.route('/login-user').post((req, res, next) => {
    userModels.findOne({ email:req.body.email }, (err, user) => {
        if (err) return res.status(500).json({
            title: 'server error',
            error: err
        })
        //  Incorrect Email
        if (!user) {
            return res.status(401).json({
                title: 'Email not found',
                error: 'Invalid credentails'
            })
        }
        // Incorrect password
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Incorrect password',
                error: 'Invalid credentails'
            })
        }
        let token = jwt.sign({ id: user._id }, 'secretkey', {
            expiresIn: "24h"
        });
        return res.status(200).json({
            title: 'login sucess',
            message: 'token has been crreate',
            token: token
        })
    })
})

UserRoute.route('/user-info').get((req, res, next) => {
    let token = req.headers.token;
    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'unauthiruzed'
        })
        //token is valid
        userModels.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'user grabbed',
                user: {
                    email: user.email,
                    username: user.username
                }
            })
        })
    })
})

module.exports = UserRoute;