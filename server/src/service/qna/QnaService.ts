import {BaseQnA} from "../../models/BaseQnA";
import {DatabaseError} from "sequelize";

function saveQnA(params:any):Promise<any> {
    console.log('Qna SVC saveQnA params : ', params);
    return new Promise<any>((resolve, reject) => {
       BaseQnA.create({
           email: params.email,
           name: params.name,
           qna: params.qna,
           provider: params.provider
       }).then((result) => {
           console.log('Qna SVC saveQnA result : ', result);
           resolve(result);
       }).catch((e:DatabaseError) => {
           console.error('Qna SVC saveQnA Error occurred : ', e);
           reject(e);
       });
    });
};

export = {
    saveQnA
}