import {BaseAuthUser} from "../models/BaseAuthUser";

const create_table_bau = async () => {
    await BaseAuthUser.sync({force:true})
        .then(() => {
            console.log('✅Success Create BAT TABLE');
        })
        .catch((e:Error) => {
            console.error('❗Error in Create BAT Table : ', e);
        });
};

create_table_bau();