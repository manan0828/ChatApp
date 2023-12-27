const express = require('express');
const Route = express.Router();
const authController = require('../../controller/auth');

Route.post('/signIn', authController.signIn);

module.exports = Route;