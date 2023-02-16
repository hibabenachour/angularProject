const express = require('express')
const multer = require('multer')

//creation branche de l'routerlication backend
const router = express.Router()

const User = require('../models/user')
const Plat = require('../models/plat')
    //configg multer
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        //Affecter la destination
        cb(null, 'backend/images')
    },
    //file name
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' +
            '.' + extension;
        //Affecter file name
        cb(null, imgName);
    }
});


//CRUD PLAT
//create plat
router.post("/", multer({ storage: storage }).single('img'), (req, res) => {
    console.log("here in create plat", req.body);
    let url = req.protocol + '://' + req.get('host')
    let plat = new Plat({
        platName: req.body.platName,
        description: req.body.description,
        price: req.body.price,
        idChef: req.body.idChef,
        img: url + '/images/' + req.file.filename

    })

    plat.save();
    //send response 
    res.status(200).json({
        message: "Plat created with succes"
    })




})
router.get('/', (req, res) => {
    console.log("here in get plats");
    Plat.find((err, docs) => {
        if (err) {
            console.log("error in DB")
        } else {
            res.status(200).json({
                plats: docs
            })
        }
    });
})
router.get('/myPlats/:id', (req, res) => {
    console.log("get plat by id");
    let id = req.params.id;
    Plat.find({ idChef: id }).then((docs) => {
        if (docs) {
            res.status(200).json({
                myPlats: docs

            })

        }
    });
})
router.get('/:id', (req, res) => {
    console.log("get plat by id");
    let id = req.params.id;
    Plat.findOne({ _id: id }).then(
        (doc) => {
            if (doc) {
                res.status(200).json({
                    plat: doc
                })
            } else {
                console.log("error in DB")
            }
        }
    )
})
router.put('/:id', (req, res) => {
    console.log("here in update plat")
    let plat = {
        _id: req.body._id,
        platName: req.body.platName,
        description: req.body.description,
        price: req.body.price,
        idChef: req.body.idChef,


    }
    Plat.updateOne({ _id: req.params.id }, plat).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    message: "plat updated with succes"
                })
            } else {
                console.log("error in DB")
            }
        }
    )
})
router.delete('/:id', (req, res) => {
    console.log("here in delete plat");
    let id = req.params.id;
    Plat.deleteOne({ _id: id }).then(
        (result) => {
            if (result) {
                res.status(200).json({
                    message: "Plat deleted with succes"
                })
            }
        })

})
module.exports = router