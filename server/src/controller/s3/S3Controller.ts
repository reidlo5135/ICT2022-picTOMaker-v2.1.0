import {Request, Response, NextFunction} from "express";
import svc from '../../service/s3/S3Service';

const uploadImage = async (req:Request, res:Response, next:NextFunction) => {
    const file = req.body.file;
    console.log('S3Controller uploadImage file : ', file);
    try {

    } catch (e) {
        console.error(e);
    }
}

export = {
    uploadImage
}
