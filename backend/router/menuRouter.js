const express = require('express');
const MenuRoute = express.Router();
const multer = require('multer')
const app = express();
// Menu Models
let MenuModels = require('../models/menuModels');

const fileFilter = function(req, file, cb) {
    const allowedType = ["image/jpeg", "image/png", "image/gif"];
    if(!allowedType.includes(file.mimetype)) {
        const error =  new Error("Wrong file type");
        error.code = "LIMIT_FILE_TYPE";
        return cb(error, false);
    }

    cb(null, true);
}

const MAX_SIZE = 3000000;
const upload = multer({
    dest: './upload/',
    fileFilter,
    limits: {
        fileSize: MAX_SIZE
    }
})

// Post Img
MenuRoute.post("/create-img", upload.single('file'), (req, res) => {
    res.json({
        file: req.file
    })
})

app.use(function(err, req, res, next) {
    if(err.code === 'LIMIT_FILE_TYPE') {
        res.status(422).json({error: "Only images are allowed"});
        return ;
    }

    if(err.code === "LIMIT_FILE_SIZE") {
        res.status(422).json({ error: `Too large. Max size is ${MAX_SIZE/1000000}MB`})
        return;
    }
})
//Get Menu
MenuRoute.route('/').get((req, res, next) => {
    MenuModels.find((err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

// Create Menu
MenuRoute.route('/create-menu').post((req, res, next) => {
    console.log(req.file);
    MenuModels.create(req.body, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

// Edit Menu
MenuRoute.route('/edit-menu/:id').get((req, res, next) => {
    MenuModels.findById(req.params.id, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
        }
    })
})

//Update
MenuRoute.route('/update-menu/:id').put((req, res, next) => {
    MenuModels.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.json(data)
            // console.log('Update successfully');
        }
    })
})

//Delete Menu
MenuRoute.route('/delete-menu/:id').delete((req, res, next) => {
    MenuModels.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) {
            return next(err)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})


module.exports = MenuRoute