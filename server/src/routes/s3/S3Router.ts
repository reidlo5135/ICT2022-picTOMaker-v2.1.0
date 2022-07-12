import express from "express";
import S3Controller from '../../controller/s3/S3Controller';
const router = express.Router();
const upload = require('../../config/S3MiddleWare');

router.post('/register/:email/:provider', S3Controller.uploadImage);
router.post('/register', upload.single('image'), S3Controller.registerS3);

export = router;