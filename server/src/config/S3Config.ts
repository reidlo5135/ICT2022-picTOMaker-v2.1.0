import dotenv from "dotenv";
dotenv.config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/s3.json');

const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'ict2022-picto-bucket',
        acl: 'public-read',
        key: function (req:any, file:any, cb:any) {
            cb(null, Date.now() + '.' + file.original.split('.').pop());
        }
    })
});

export = upload;