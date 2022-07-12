const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const {s3Secret} = require('../config/S3Secret');

aws.config.update({
    accessKeyId: s3Secret.aws_access_key,
    secretAccessKey: s3Secret.aws_secret_key,
    region: s3Secret.region
})
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3:s3,
        acl: 'public-read-write',
        bucket: 'ict2022-picto-bucket',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function(req:any, file:any, cb:any) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req:any, file:any, cb:any) {
            cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
        }
    })
});

export = {
    upload
}

