const express = require('express')
    //creation branche de l'application backend
const router = express.Router()
const bcrypt = require("bcrypt")
    //import pdfkit 
const fs = require('fs')
const PDFDocument = require('../pdfKit')
const User = require('../models/user')
const Plat = require('../models/plat')

//create user
router.post("/", (req, res) => {
    console.log("here in create user", req.body);
    bcrypt.hash(req.body.password, 10).then(
        (cryptedPwd) => {
            let user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: cryptedPwd,
                    tel: req.body.tel,
                    role: req.body.role,
                    speciality: req.body.speciality,
                    experience: req.body.experience,
                    dateOfBirth: req.body.dateOfBirth


                })
                //sauvegarde user
            user.save();
            //send response 
            res.status(200).json({
                message: "User created with succes"
            })

        }
    )

})
router.get('/', (req, res) => {
    console.log("here in get users");
    User.find((err, docs) => {
        if (err) {
            console.log("error in DB")
        } else {
            res.status(200).json({
                users: docs
            })
        }
    });
})

//get users by role
router.get('/getUserByRole/:role', (req, res) => {
    console.log("get user by role");
    let roleUser = req.params.role;
    console.log("roleUser", roleUser)
    User.find({ role: roleUser }).then(
        (docs) => {
            if (docs) {
                res.status(200).json({
                    users: docs
                })
            } else {
                console.log("error in DB")
            }
        }
    )
})
router.delete('/:id', (req, res) => {
    console.log("here in delete user");
    let id = req.params.id;
    let user;
    User.findOne({ _id: id }).then(
        (doc) => {
            if (doc) {
                console.log("req", doc)
                if (doc.role == "chef") {
                    console.log("get plat by id chef");

                    Plat.deleteMany({ idChef: doc._id }).then(
                        (result) => {
                            if (result) {


                            }
                        })


                }
                User.deleteOne({ _id: doc._id }).then(
                    (result) => {
                        if (result) {
                            res.status(200).json({
                                message: "User deleted with succes"
                            })
                        }
                    })

            }
        }
    )




})
router.put('/:id', (req, res) => {
        console.log("here in update user")
        let user = {
            _id: req.body._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            tel: req.body.tel,
            role: req.body.role,
            speciality: req.body.speciality,
            experience: req.body.experience,
            dateOfBirth: req.body.dateOfBirth


        }
        User.updateOne({ _id: req.params.id }, user).then(
            (result) => {
                if (result) {
                    res.status(200).json({
                        message: "user updated with succes"
                    })
                } else {
                    console.log("error in DB")
                }
            }
        )
    })
    //login
router.post("/login", (req, res) => {
    console.log("Here in login", req.body);
    User.findOne({ email: req.body.email }).then(
            (resultEmail) => {
                console.log("resultEmail", resultEmail);
                if (!resultEmail) {
                    res.status(200).json({
                        message: "Wrong Email"
                    });
                }
                return bcrypt.compare(req.body.password, resultEmail.password);
            })
        .then(
            (resultPwd) => {
                console.log("resultPwd", resultPwd);
                if (!resultPwd) {
                    res.status(200).json({
                        message: "Wrong password"
                    });
                } else {
                    User.findOne({ email: req.body.email }).then(
                        (result) => {
                            console.log("result", result);
                            res.status(200).json({
                                findedUser: result,
                                message: "success!"
                            })
                        }
                    )
                }
            })
});
router.get("/generatePdf", (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log("ERROR");
        } else {
            // Create The PDF document
            const doc = new PDFDocument();
            // Pipe the PDF into a user's file
            doc.pipe(fs.createWriteStream(`backend/pdfs/test.pdf`));
            // Add the header -https://pspdfkit.com/blog/2019/generate-invoices pdfkit-node/
            doc.image("backend/images/logo.png", 50, 45, { width: 50 }).fillColor("#444444").fontSize(20).text("Here All Users", 110, 57).fontSize(10).text("Imm Yasmine Tower", 200, 65, { align: "right" }).text("Centre Urbain Nord", 200, 80, { align: "right" }).moveDown();
            // Create the table -https://www.andronio.me/2017/09/02/pdfkit-tables/
            const table = {
                headers: [
                    "FirstName",
                    "LastName",
                    "Email Address",
                    "Phone",
                    "role",
                ],
                rows: [],
            };
            // Add the users to the table
            for (const user of docs) {
                table.rows.push([
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.tel,
                    user.role,
                ]);
            }
            // Draw the table
            doc.moveDown().table(table, 10, 125, { width: 590 }); // Finalize the PDF and end the stream
            doc.end();
            res.status(200).json({
                message: "HERE PDF (success)",
            });
        }
    });
});
router.get('/:id', (req, res) => {
    console.log("get user by id");
    let id = req.params.id;
    User.findOne({ _id: id }).then(
        (doc) => {
            if (doc) {
                res.status(200).json({
                    user: doc
                })
            } else {
                console.log("error in DB")
            }
        }
    )
})
module.exports = router