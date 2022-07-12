import multer from "multer";
const s3 = require('../config/S3Secret');
const multerS3 = require('multer-s3');

export const upload = multer({
    storage: multerS3({
        s3:s3,
        acl: 'public-read-write',
        bucket: 'ict2022-picto-bucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req:any, file:any, cb:any) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
});

