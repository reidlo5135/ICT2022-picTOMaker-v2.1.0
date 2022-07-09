import {BaseLocalUser} from "../models/BaseLocalUser";

const create_table_blu = async () => {
    await BaseLocalUser.sync({force:true})
        .then(() => {
            console.log('✅Success Create BLU TABLE');
        })
        .catch((e:Error) => {
            console.error('❗Error in Create BLU Table : ', e);
        });
};

create_table_blu();