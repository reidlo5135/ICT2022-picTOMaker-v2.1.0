import express from "express";
const router = express.Router();
const controller = require('../../controller/oauth/OAuthController');

router.post('/token/:provider', controller.generateToken);
router.post('/profile/:provider', controller.extractProfile);
router.delete('/token/invalid/:access_token', controller.invalidToken);

export = router;
