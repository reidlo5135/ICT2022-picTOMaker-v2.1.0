import {BaseQnA} from "../models/BaseQnA";

const create_table_bqna = async () => {
    await BaseQnA.sync({force:true})
        .then(() => {
            console.log('✅Success Create BQNA TABLE');
        })
        .catch((e:Error) => {
            console.error('❗Error in Create BQNA Table : ', e);
        });
}

create_table_bqna();