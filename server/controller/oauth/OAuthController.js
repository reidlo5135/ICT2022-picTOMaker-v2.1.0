const axios = require("axios");
const env = require('../../config/OAuthConfig');
const svc = require('../../service/oauth/OAuthService');

const generateToken = async (req, res, next) => {
    const code = req.body.code;
    const provider = req.params.provider;
    console.log('OAuthController generateToken code : ', code);
    console.log('OAuthController generateToken provider : ', provider);
    let url;
    if(provider !== null) {
        if(provider === 'kakao') {
            url = env.KAKAO.KAKAO_TOKEN_URL + `${code}`;
        } else if(provider === 'naver') {
            url = env.NAVER.NAVER_TOKEN_URL + `${code}`;
        }
    }
    try {
        axios.post(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((result) => {
            const access_token = result.data['access_token'];
            const refresh_token = result.data['refresh_token'];
            console.log('OAuthController generateToken access_token : ', access_token);
            console.log('OAuthController generateToken refresh_token : ', refresh_token);

            const bat = {
                access_token,
                refresh_token
            };
            svc.generateToken(bat);
            res.send({'code': 0,'message':'success','access_token':access_token, 'refresh_token':refresh_token});
        }).catch(e => {
            console.error(e);
            res.send(e);
        })
    } catch (e) {
        console.error(e);
        res.send(e);
    }
};

const extractProfile = async (req, res, next) => {
    const access_token = req.body.access_token;
    const provider = req.params.provider;
    console.log('OAuthController extractProfile access_token : ', access_token);
    console.log('OAuthController extractProfile provider : ', provider);
    try {
        axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + access_token
            }
        }).then((result) => {
            const profile = result.data['properties'];
            const profile_image_url = profile.profile_image;
            const nickname = profile.nickname;
            const account_info = result.data['kakao_account'];
            const email = account_info.email;

            console.log('OAuthController extractProfile result.data : ', result.data);
            console.log('OAuthController extractProfile profile : ', profile);

            const bau = {
                email,
                name: nickname,
                picture: profile_image_url
            }
            svc.registerProfile(bau);
            res.send({'code':0,'message': 'success', 'profile_image_url':profile_image_url,'email':email,'nickname':nickname});
        }).catch(e => {
            console.error(e);
            res.send(e);
        });
    } catch (e) {
        console.error(e);
        res.send(e);
    }
};

module.exports = {
    generateToken: generateToken,
    extractProfile: extractProfile
}