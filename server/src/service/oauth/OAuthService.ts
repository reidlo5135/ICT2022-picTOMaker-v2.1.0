import {BaseAccessToken} from "../../models/BaseAccessToken";
import {BaseAuthUser} from "../../models/BaseAuthUser";
import {DatabaseError} from "sequelize";

function generateToken(params:any): Promise<any> {
    console.log('OAuth SVC generateToken params : ', params);
    return new Promise<any>((resolve, reject) => {
        BaseAccessToken.findOrCreate({
            where: {
                access_token: params.access_token
            },
            defaults: {
                access_token : params.access_token,
                expires_in : params.expires_in,
                provider : params.provider.toUpperCase(),
                refresh_token : params.refresh_token,
                refresh_token_expires_in : 21599,
                token_type: params.token_type
            }
        }).then((result) => {
            console.log('OAuth SVC generateToken result : ', result);
            return result;
        }).catch((e:DatabaseError) => {
            console.error('OAuth SVC BAT generateToken error : ', e);
            reject(e);
        });
    })
};

function registerProfile(params:any): Promise<any> {
    console.log('OAuth SVC registerProfile params : ', params);
    return new Promise<any>((resolve, reject) => {
        BaseAuthUser.findOrCreate({
            where: {
                email: params.email
            },
            defaults: {
                email: params.email,
                name: params.name,
                picture: params.picture,
                provider: params.provider,
                role: params.provider.toUpperCase()
            }
        }).then((result) => {
            console.log('OAuth SVC registerProfile result : ', result);
            return result;
        }).catch((e:DatabaseError) => {
            console.error('OAuth SVC BAU registerProfile error : ', e);
            reject(e);
        });
    })
};

function invalidToken(access_token:string): Promise<any> {
    console.log('OAuth SVC invalidToken access_token : ', access_token);
    return new Promise<any>((resolve, reject) => {
        BaseAccessToken.findOne({
            where: {
                access_token: access_token
            }
        }).then((result) => {
            console.log('OAuth SVC invalidToken findOne result : ', result);
            return BaseAccessToken.destroy({
                where:{
                    access_token: access_token
                }
            }).then((result) => {
                console.log('OAuth SVC invalidToken result : ', result);
                return result;
            }).catch((e:DatabaseError) => {
                console.error('OAuth SVC invalidToken destroy error : ', e);
            });
        }).catch((e:DatabaseError) => {
            console.error('OAuth SVC invalidToken findOne error : ', e);
            reject(e);
        });
    });
};

export = {
    generateToken,
    registerProfile,
    invalidToken
}