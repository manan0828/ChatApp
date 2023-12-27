const express = require('express');
const Route = express.Router();
const userController = require('../../controller/user');

Route.post('/createuser', userController.createUser);

module.exports = Route;