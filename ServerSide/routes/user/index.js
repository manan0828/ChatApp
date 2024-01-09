const express = require('express');
const Route = express.Router();
const userController = require('../../controller/user');

Route.post('/createuser', userController.createUser);
Route.get('/getUsers', userController.getUsers);
Route.post('getbyname', userController.getByName);

module.exports = Route;