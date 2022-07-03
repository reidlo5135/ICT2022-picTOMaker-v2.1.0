const axios = require("axios");
const KAKAO_CLIENT_ID = "42c51ed9e78ced900811f39d27801209";
const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_REDIRECT_URI = "http://localhost:8080/oauth2/redirect/kakao";

const generateToken = async (req, res, next) => {
    const code = req.body.code;
    console.log('OAuthController generateToken code : ', code);
    try {
        axios.post(`${KAKAO_TOKEN_URL}?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((result) => {
            const access_token = result.data['access_token'];
            const refresh_token = result.data['refresh_token'];

            console.log('OAuthController generateToken access_token : ', access_token);
            console.log('OAuthController generateToken refresh_token : ', refresh_token);

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
    console.log('OAuthController extractProfile access_token : ', access_token);
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