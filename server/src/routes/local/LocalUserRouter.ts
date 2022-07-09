import express from "express";
const router = express.Router();
const controller = require('../../controller/local/LocalUserController');

router.post('/login', controller.generateToken);
router.post('/signUp', controller.signUp);
router.post('/profile')

export = router;