import express from "express";
import S3Controller from '../../controller/s3/S3Controller';
const router = express.Router();

router.post('/register/:email/:provider', S3Controller.uploadImage);
router.post('/find/:email', S3Controller.getPicTo);

export = router;