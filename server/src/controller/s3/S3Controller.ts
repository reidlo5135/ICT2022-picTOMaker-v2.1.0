import {Request, Response, NextFunction} from "express";
import svc from '../../service/s3/S3Service';

const uploadImage = async (req:Request, res:Response, next:NextFunction) => {
    const image = req.body.image;
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
            (resolve) => {
                console.log('S3Controller uploadImage promise resolve : ', JSON.stringify(resolve));
                res.send({'code':0,'message':'success'});
            },
            (reject) => {

            }
        );
    } catch (e) {
        console.error(e);
    }
}

export = {
    uploadImage
}
