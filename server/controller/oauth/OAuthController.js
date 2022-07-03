const axios = require("axios");
const KAKAO_CLIENT_ID = "42c51ed9e78ced900811f39d27801209";
const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const KAKAO_REDIRECT_URI = "http://localhost:8080/oauth2/redirect/kakao";

const generateToken = async (req, res, next) => {
    const code = req.body.code;
    console.log('OAuthController oauth2 code : ', code);
    try {
        axios.post(`${KAKAO_TOKEN_URL}?grant_type=authorization_code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((result) => {
            const access_token = result.data['access_token'];
            const refresh_token = result.data['refresh_token'];
            console.log('OAuthController access_token : ', access_token);
            console.log('OAuthController refresh_token : ', refresh_token);
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

module.exports = {
    generateToken: generateToken
}