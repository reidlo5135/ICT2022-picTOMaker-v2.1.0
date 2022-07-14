import {Request, Response, NextFunction} from "express";
const svc = require('../../service/s3/S3Service');

const uploadImage = async (req:Request, res:Response, next:NextFunction) => {
    const image = req.body.image
    const email = req.params.email;
    const provider = req.params.provider;
    console.log('S3Controller uploadImage image : ', image);
    console.log('S3Controller uploadImage email : ', email);
    console.log('S3Controller uploadImage provider : ', provider);
    try {
        const params = {
            image,
            email,
            provider
        }
        svc.decodeImage(params).then(
            (resolve:any) => {
                console.log('S3Controller uploadImage promise resolve : ', JSON.stringify(resolve));
                res.send({'code':0, 'message':'success'});
            },
            (reject:any) => {
                console.error('S3Controller uploadImage promise reject : ', JSON.stringify(reject));
                res.send({'code':-1, 'message':'failed'});
            }
        );
    } catch (e) {
        console.error(e);
    }
};

const getPicTo = async (req:Request, res:Response) => {
    const email = req.params.email;
    console.log('S3Controller getPicTo email : ', email);
    try {
        svc.getPicToList(email).then(
            (resolve:any) => {
                console.log('S3Controller getPicTo promise resolve : ', JSON.stringify(resolve));
                res.send({'code':0, 'message':'success', 'list':resolve});
            },
            (reject:any) => {
                console.error('S3Controller getPicTo promise reject : ', JSON.stringify(reject));
                res.send({'code':-1, 'message':'failed'});
            }
        );
    } catch (e) {
        console.error(e);
    }
};

export = {
    uploadImage,
    getPicTo
}

