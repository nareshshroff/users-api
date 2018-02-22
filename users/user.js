const {ObjectID} = require('mongodb');
var {mongoose} = require('./../db/dbserver.js');
var {userObj} = require('./../models/usermodel.js');

var express = require('express');
var bodyparser = require('body-parser');

var port = process.env.PORT || 3000;      

var app = express();

app.use(bodyparser.json());

app.post('/user', (req,res) => {
    var user = new userObj({
        name: req.body.name,
        email: req.body.email
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send('Unable to save.');
    });
});

app.get('/user/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(400).send('Id is invalid');
    }

    userObj.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send('Unabel to find user');
        }
        res.send(user);
    }).catch((ex) => {
        res.status(400).send(`Error getting user ${ex}`);
    })
});

app.get('/user/', (req,res) => {
    userObj.find().then((user) => {
        if (!user)
            return res.status(404).send('Unabel to find user');
        
        res.send(user);
    }).catch((ex) => {
        res.status(400).send(`Error getting user ${ex}`);
    })
});

app.delete('/user/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(400).send('Id is invalid');
    }

    userObj.findByIdAndRemove(id).then((user) => {
        if (!user) {
            return res.status(404).send('Unabel to find user');
        }
        res.send(user);
    }).catch((ex) => {
        res.status(400).send(`Error getting user ${ex}`);
    })
});

app.patch('/user/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(400).send('Id is invalid');
    }

    userObj.findByIdAndUpdate(id, {$set:req.body}, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send('Unabel to find user');
        }
        res.send(user);
    }).catch((ex) => {
        res.status(400).send(`Error getting user ${ex}`);
    })
});

app.listen(port, () => {
    console.log('Server listening on port 3000');
});