
function decodeImage(params:any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const octet = params.image.split(',');
        console.log('S3 SVC octet : ', octet);
        const decoded = Buffer.from(octet[1], 'base64').toString('utf-8');
        console.log('S3 SVC decoded : ', decoded);

        const blob = new Blob([decoded], {type:'image/png'});
        console.log('S3 SVC blob : ', blob);
        resolve(decoded);
    });
}

export = {
    decodeImage
}