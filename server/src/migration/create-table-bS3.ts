import {BaseS3Image} from "../models/BaseS3Image";

const create_table_bS3 = async () => {
    await BaseS3Image.sync({force:true})
        .then(() => {
            console.log('✅Success Create BS3 TABLE');
        })
        .catch((e:Error) => {
            console.error('❗Error in Create BS3 Table : ', e);
        });
};

create_table_bS3();