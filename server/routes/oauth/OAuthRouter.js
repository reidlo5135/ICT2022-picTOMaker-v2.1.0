const express = require('express');
const router = express.Router();
const controller = require('../../controller/oauth/OAuthController');

router.post('/v1/api/oauth2/token/:provider', controller.generateToken);

module.exports = router;
