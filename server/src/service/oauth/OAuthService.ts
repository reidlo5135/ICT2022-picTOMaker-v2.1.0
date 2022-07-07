import {BaseAccessToken} from "../../models/BaseAccessToken";
import {BaseAuthUser} from "../../models/BaseAuthUser";

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
        })
    })
}

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
        })
    })
}

export = {
    generateToken: generateToken,
    registerProfile: registerProfile
}