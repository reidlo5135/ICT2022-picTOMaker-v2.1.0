import express from 'express';
const router = express.Router();
const controller = require('../../controller/qna/QnaController');

router.post('/register/:provider', controller.registerQna);

export = router;
