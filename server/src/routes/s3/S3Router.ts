import express from "express";
import S3Controller from '../../controller/s3/S3Controller';
const router = express.Router();
const {upload} = require('../../config/S3MiddleWare');

router.post('/register/:email/:provider', upload.single('file'), S3Controller.uploadImage);

export = router;