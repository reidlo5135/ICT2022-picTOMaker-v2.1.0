const models = require('../../models');

const queryInsert = async (params) => {
    console.log('DB CONN queryInsert params : ', params);
    const token = await models.BaseAccessToken.create(params);
    console.log('DB CONN queryInsert token : ', token);
}

module.exports = {
    queryInsert: queryInsert
}