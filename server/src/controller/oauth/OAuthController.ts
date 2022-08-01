import {Request, Response} from "express";
import {AxiosError, AxiosResponse} from "axios";
const axios = require("axios");
const env = require('../../config/OAuthConfig');
const svc = require('../../service/oauth/OAuthService');

const generateToken = async (req:Request, res:Response) => {
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
        }).then((result:AxiosResponse) => {
            const access_token = result.data['access_token'];
            const refresh_token = result.data['refresh_token'];
            const token_type = result.data['token_type'];
            const expires_in = result.data['expires_in'];

            console.log('OAuthController generateToken access_token : ', access_token);
            console.log('OAuthController generateToken refresh_token : ', refresh_token);
            console.log('OAuthController generateToken token_type : ', token_type);
            console.log('OAuthController generateToken expires_in : ', expires_in);

            const bat = {
                access_token,
                refresh_token,
                token_type,
                expires_in,
                provider
            };
            svc.generateToken(bat).then(
                (resolve:any) => {
                    console.log('OAuthController generateToken promise resolve : ', JSON.stringify(resolve));
                    res.status(200).send({'code': 0,'message':'success','access_token':access_token, 'refresh_token':refresh_token});
                },
                (reject:any) => {
                    console.log('OAuthController generateToken promise reject : ', JSON.stringify(reject));
                    res.status(500).send({'code':-1,'message':'failed'});
                }
            );
        }).catch((e:AxiosError) => {
            console.error(e);
            res.send(e);
        })
    } catch (e) {
        console.error(e);
        res.send(e);
    }
};

const extractProfile = async (req:Request, res:Response) => {
    const access_token = req.body.access_token;
    const provider = req.params.provider;
    console.log('OAuthController extractProfile access_token : ', access_token);
    console.log('OAuthController extractProfile provider : ', provider);
    let url;
    if(provider !== null) {
        if(provider === 'kakao') {
            url = env.KAKAO.KAKAO_PROFILE_URL;
        } else if(provider === 'naver') {
            url = env.NAVER.NAVER_PROFILE_URL;
        }
    }
    try {
        axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + access_token
            }
        }).then((result:AxiosResponse) => {
            console.log('OAuthController extractProfile result.data : ', result.data);
            var profile;
            var profile_image_url;
            var nickname;
            var email;
            if(provider === 'kakao') {
                profile = result.data['properties'];
                console.log('OAuthController extractProfile ', provider, ' profile : ', profile);
                profile_image_url = profile.profile_image;
                nickname = profile.nickname;
                const account_info = result.data['kakao_account'];
                email = account_info.email;
            } else if(provider === 'naver') {
                profile = result.data['response'];
                console.log('OAuthController extractProfile ', provider, ' profile : ', profile);
                profile_image_url = profile.profile_image;
                nickname = profile.name;
                email = profile.email;
            }
            const bau = {
                email,
                name: nickname,
                picture: profile_image_url,
                provider
            }
            svc.registerProfile(bau).then(
                (resolve:any) => {
                    console.log('OAuthController extractProfile promise resolve : ', JSON.stringify(resolve));
                    res.status(200).send({'code':0,'message': 'success', 'profile_image_url':bau.picture,'email':bau.email,'nickname':bau.name});
                },
                (reject:any) => {
                    console.log('OAuthController extractProfile promise reject : ', reject);
                    res.status(500).send({'code':-1,'message':'failed'});
                }
            );
        }).catch((e:AxiosError) => {
            console.error(e);
            res.send(e);
        });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

const invalidToken = async (req:Request, res:Response) => {
    const access_token = req.params.access_token;
    console.log('OAuthController invalidToken access_token : ', access_token);
    try {
        svc.invalidToken(access_token).then(
            (resolve:any) => {
                console.log('OAuthController invalidToken promise resolve : ', JSON.stringify(resolve));
                res.status(200).send({'code':0,'message':'success'});
            },
            (reject:any) => {
                console.log('OAuthController invalidToken promise reject : ', JSON.stringify(reject));
                res.status(500).send({'code':-1,'message':'failed'});
            });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
};

export = {
    generateToken,
    extractProfile,
    invalidToken
}