const models = require("../../models");
const BaseAccessToken = models.BaseAccessToken;
const BaseAuthUser = models.BaseAuthUser;
const Op = models.Sequelize.Op;

const generateToken = async (params) => {
    console.log('OAuth SVC generateToken params : ', params);
    const bat = {
        access_token : params.access_token,
        expires_in : 21599,
        provider : 'KAKAO',
        refresh_token : params.refresh_token,
        refresh_token_expires_in : 21599,
        token_type: 'bearer'
    }

    const [model, created] = await BaseAccessToken.findOrCreate({
        where: {
            access_token: bat.access_token
        },
        defaults: bat
    }).catch(err => {
        console.error(err);
    });
    console.log('OAuth SVC bat model : ', model, ', created : ', created);
}

const registerProfile = async (params) => {
    console.log('OAuth SVC registerProfile params : ', params);
    const bau = {
        email: params.email,
        name: params.name,
        picture: params.picture,
        provider: 'kakao',
        role: 'KAKAO'
    }
    const [model, created] = await BaseAuthUser.findOrCreate({
        where: {
            email: bau.email
        },
        defaults: bau
    }).catch(err => {
        console.error(err);
    });
    console.log('OAuth SVC bau model : ', model, ', created : ', created);
}

module.exports = {
    generateToken: generateToken,
    registerProfile: registerProfile
}