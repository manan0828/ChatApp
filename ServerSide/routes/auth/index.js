const express = require('express');
const Route = express.Router();
const authController = require('../../controller/auth');

Route.post('/signIn', authController.signIn);
Route.post('/login', authController.login);

module.exports = Route;