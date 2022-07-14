import {BaseS3Image} from "../../models/BaseS3Image";
import {DatabaseError} from "sequelize";
const {writeFileSync, readFileSync} = require('fs');
const AWS = require('aws-sdk');
const {s3Secret} = require('../../config/S3Secret');

const s3 = new AWS.S3({
    accessKeyId: s3Secret.aws_access_key,
    secretAccessKey: s3Secret.aws_secret_key,
    region: s3Secret.region
});

function decodeImage(params:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const octet = params.image.split(',');
        console.log('S3 SVC downLoad octet 0 : ', octet[0]);
        console.log('S3 SVC downLoad octet 1 : ', octet[1]);
        const decoded = Buffer.from(octet[1], 'base64');
        console.log('S3 SVC downLoad decoded : ', decoded);

        writeFileSync('C:\\myPicTO\\test-image.png', decoded);
        const file = readFileSync('C:\\myPicTO\\test-image.png');
        console.log('S3 SVC decodeImage readFileSync file : ', file);

        const s3Params = {
            Bucket: 'ict2022-picto-bucket',
            Key: Math.floor(Math.random() * 1000).toString() + Date.now() + '.png',
            Body: file
        };

        s3.upload(s3Params, function (err:Error, data:any) {
            if(err) {throw err;}
            console.log('S3 SVC uploaded successfully : ', JSON.stringify(data));
            BaseS3Image.create({
                email: params.email,
                file_name: data.key,
                extension: '.png',
                file_url: data.Location,
                provider: params.provider
            }).then((result) => {
                console.log('S3 SVC decodeImage bS3 create result : ', result);
                resolve(result);
            }).catch((e:DatabaseError) => {
                console.error('S3 SVC decodeImage bS3 create Error occurred : ', e);
                reject(e);
            });
        });
    });
};

function getPicToList(email:string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        BaseS3Image.findAll({
            where: {
                email
            }
        }).then((result) => {
            console.log('S3 SVC getPicToList bS3 findByEmail result : ', result);
            resolve(result);
        }).catch((e:DatabaseError) => {
            console.error('S3 SVC getPicToList bS3 findByEmail Error occurred : ', e);
            reject(e);
        });
    });
}

export = {
    decodeImage,
    getPicToList
}