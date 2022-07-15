import {Request, Response} from "express";
const svc = require('../../service/qna/QnaService');

const registerQna = async (req:Request, res:Response) => {
    const email = req.body.email;
    const name = req.body.name;
    const qna = req.body.qna;
    const provider = req.params.provider;

    try {
        const params = {
            email,
            name,
            qna,
            provider
        }
        console.log('QnaController registerQna params : ', params);
        svc.saveQnA(params).then(
            (resolve:any) => {
                console.log('QnaController registerQna promise result : ', JSON.stringify(resolve));
                res.send({'code':0, 'message':'success'});
            },
            (reject:any) => {
                console.log('QnaController registerQna promise reject : ', JSON.stringify(reject));
                res.send({'code':-1, 'message':'failed'});
            }
        );
    } catch (e) {
        console.error(e);
    }
}

export = {
    registerQna
}