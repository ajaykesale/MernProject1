const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const User = require("../models/userModel");

//create
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    const User = require("../models/userModel");
    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

});

//getall data
router.get('/', async (req, res) => {
    try {
        const getAll = await User.find();
        res.status(200).json(getAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    // res.send("api running")
});


//get single data from Id 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log("going to post");
        const getOne = await User.findById({ _id: id });
        res.status(200).json(getOne);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    // res.send("api running")
});

// delete data using id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteOne = await User.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteOne);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    // res.send("api running")
});


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updateOne = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updateOne);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    // res.send("api running")
});


module.exports = router;