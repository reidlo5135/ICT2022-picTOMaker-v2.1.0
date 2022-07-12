const {writeFileSync, readFileSync} = require('fs');

function decodeImage(params:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const octet = params.image.split(',');
        console.log('S3 SVC octet 0 : ', octet[0]);
        console.log('S3 SVC octet 1 : ', octet[1]);
        const decoded = Buffer.from(octet[1], 'base64');
        console.log('S3 SVC decoded : ', decoded);

        writeFileSync('C:\\myPicTO\\test-image.png', decoded);
        const file = readFileSync('C:\\myPicTO\\test-image.png');
        console.log('S3 SVC decodeImage readFileSync file : ', file);
        resolve(file);
    });
}

function uploadS3(imageName:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {

    });
}

export = {
    decodeImage,
    uploadS3
}