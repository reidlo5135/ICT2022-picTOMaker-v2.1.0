import express from "express";
const router = express.Router();
const controller = require('../../controller/oauth/OAuthController');

router.post('/v1/api/oauth2/token/:provider', controller.generateToken);
router.post('/v1/api/oauth2/profile/:provider', controller.extractProfile);

export = router;
