const express = require('express');
const router = express.Router();

router.get('/v1/api/test', (req, res) => {
    console.log('TEST API');
    res.send({test: 'TESTESTESTSETST'});
});

module.exports = router;