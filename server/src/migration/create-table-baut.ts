import {BaseAuthUserToken} from "../models/BaseAuthUserToken";

const create_table_bat = async () => {
    await BaseAuthUserToken.sync({force:true})
        .then(() => {
            console.log('✅Success Create BAT TABLE');
        })
        .catch((e:Error) => {
            console.error('❗Error in Create BAT Table : ', e);
        });
}

create_table_bat();