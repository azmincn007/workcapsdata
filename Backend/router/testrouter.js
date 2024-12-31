const express = require('express');
const { registerUser, getUsers, loginUser } = require('../controller/authentication/UserController');

const router = express.Router();

//Authentication
router.get('/getusers', getUsers);
router.post('/login', loginUser);
router.post('/register', registerUser);

module.exports = router;