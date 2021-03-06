const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const auth = require("../auth/auth");
const async = require('async');
const User = require('../models/user');

//**************************** USER CRUD************************************//
userRouter.post('/', async (req, res) => {
	try {

		const user = {
			username: req.body.username,
			email: req.body.mail,
			password: req.body.password,
			tipo: req.body.type,
		};

		let newUser = await User.addUser(user);
		res.status(200).json(newUser);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});


// Delete user
userRouter.delete('/:item', auth, async (req, res, next) => {
	try {

		//		const item = req.query.item;
		const item = req.params.item;
		console.log(item)
		let response = await User.deleteUser(item);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}
});

// Update user, NEED TO IMPROVE
userRouter.put('/', auth, async (req, res, next) => {
	try {
		const user = req.user;
		const updateData = req.body.updateData;

		let response = await User.updateUser(updateData);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}


});

// Get User
userRouter.get('/', auth, async (req, res, next) => {
	return res.json({
		user: req.user
	});
});


userRouter.get('/all', auth, async (req, res, next) => {
	try {
		let response = await User.getUsers();
		console.log(response);
		res.status(200).json(response);
	}
	catch (e) {
		res.status(400).json(e.toString());
	}

});

module.exports = userRouter;