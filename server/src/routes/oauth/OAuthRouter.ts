import express from "express";
const router = express.Router();
const controller = require('../../controller/oauth/OAuthController');

router.post('/v1/api/oauth2/token/:provider', controller.generateToken);
router.post('/v1/api/oauth2/profile/:provider', controller.extractProfile);
router.delete('/v1/api/oauth2/token/invalid/:access_token', controller.invalidToken);

export = router;
