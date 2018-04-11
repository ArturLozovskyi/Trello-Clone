const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Card = require('../models/card');
const Task = require('../models/task');
const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb://lozovartur77:45balo45__@ds231549.mlab.com:31549/trello";


mongoose.connect(db, err => {
    if(err) {
        console.log(err);
    }   
    else {
        console.log('Connected to mongodb');
    }
})


router.get('/',(req,res)=>{
    res.send('From api');
});

//CARDS
var allCards;
router.get('/cards', (req,res) => {
    Card.find({})
        .exec((err,cards) => {
            if(err) {
                console.log(err)
            }
            else {
                allCards = cards;
                res.json(cards);             
            }
        })
});

router.post('/card', (req,res) => {
    let cardData = req.body;
    let card = new Card(cardData);
    card.save((err, addCard) => {
        if(err) {
            console.log(err);
        }
        else {
            res.status(200).send(addCard);
        }
    });
});

router.delete('/card/:id', (req,res) => {
    Card.findByIdAndRemove(req.params.id, (err, deleteCard) => {
        if(err) {
            console.log(err);
        }
        else { 
            res.json(deleteCard);
        }
   }); 
});


router.put('/card/:id', (req,res) => {
    Card.findByIdAndUpdate(req.params.id,
        {
            $set: {name : req.body.name}
        },
        {
            new: true
        },
        (err, updateCard) => {

            if(err) {
                console.log(err);
            }
            else { 
                res.json(updateCard);
            }
        }
   ); 
});

//TASKS

router.get('/tasks', (req,res) => {
    Task.find({})
    .exec((err,cards) => {
        if(err) {
            console.log(err)
        }
        else {
            res.json(cards);
        }
    })
});

router.post('/task', (req, res) => {
    let taskData = req.body;
    let task = new Task(taskData);
    task.save((err, addTask) => {
        if(err) {
            consol.log(err);
        }
        else {
            res.status(200).send(addTask);
        }
    });
});

router.delete('/task/:id', (req,res) => {
    Task.findByIdAndRemove(req.params.id, (err, deleteTask) => {
        if(err) {
            console.log(err);
        }
        else { 
            res.json(deleteTask);
        }
   }); 
});

router.put('/task/:id', (req,res) => {
    Task.findByIdAndUpdate(req.params.id,
        {
            $set: { text: req.body.text }
        },
        {
            new : true
        },
        (err, updateTask) => {
            if(err) {
                console.log(err);
            }
            else {
                res.json(updateTask);
            }
        }
    )
});

//REGISTER

router.post('/register', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if(err) {
            console.log(err);
        }
        else {
            if(!user){
                let user = new User(userData);
                user.save((err, registeredUser) => {
                    if(err) {
                        console.log(err);
                    }
                    else {
                        let payload = { subject: registeredUser._id }
                        let token = jwt.sign(payload,'secretKey');
                        res.status(200).send(token);
                    }
                });
            }
            else {
                res.status(401).send('You have already registered');
            }
        }
    });
   
});

 //LOGIN

 router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if(err) {
            console.log(err);
        }
        else {
            if(!user){
                res.status(401).send('Mistake with email');
            } else if (user.password !== userData.password){
                res.status(401).send('Mistake with password');
            }
            else {
                let payload = { subject: user._id };
                let token = jwt.sign(payload,'secretKey');
                res.status(200).send(user);
            }
        }
    });
 });    



module.exports = router;
