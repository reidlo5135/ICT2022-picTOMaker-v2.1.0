import {Request, Response} from "express";
const svc = require('../../service/local/LocalUserService');

const generateToken = async (req:Request, res:Response) => {
    try {
        const params = {
            email : req.body.email,
            password : req.body.password
        };
        console.log('LocalUserController generateToken email : ', params.email, ', password : ', params.password);
        svc.login(params).then(
            (resolve:any) => {
                console.log('LocalUserController generateToken promise stringify : ', JSON.stringify(resolve));
                const access_token = resolve[0].access_token;
                const refresh_token = resolve[0].refresh_token;
                console.log('LocalUserController generateToken promise accessToken : ', access_token);
                console.log('LocalUserController generateToken promise refreshToken : ', refresh_token);
                res.status(200).send({'code':0, 'message': 'success', 'access_token': access_token, 'refresh_token': refresh_token});
            },
            (reject:any) => {
                console.log('LocalUserController generateToken promise reject : ', JSON.stringify(reject));
                res.send({'code':-1, 'message': 'failed', 'error': reject});
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

const signUp = async (req:Request, res:Response) => {
    try {
        const params = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            nick_name: req.body.nickName
        }
        console.log('LocalUserController signUp params : ', params);
        svc.registerUser(params).then(
            (resolve:any) => {
                console.log('LocalUserController signUp promise resolve : ', JSON.stringify(resolve));
                res.status(200).send({'code':0, 'message':'success'});
            },
            (reject:any) => {
                console.log('LocalUserController signUp promise reject : ', JSON.stringify(reject));
                res.status(500).send({'code':-1, 'message': 'failed'})
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

const getProfile = async (req:Request, res:Response) => {
    const access_token = req.body.access_token;
    console.log('LocalUserController getProfile access_token : ', access_token);
    try {
        svc.userProfile(access_token).then(
            (resolve:any) => {
                console.log('LocalUserController getProfile promise result : ', JSON.stringify(resolve));
                const result = {
                    email: resolve[0].email,
                    name: resolve[0].name,
                    nick_name: resolve[0].nick_name,
                    profile_image_url: resolve[0].profile_image_url,
                    provider: resolve[0].provider
                }
                res.status(200).send({'code':0, 'message': 'success', 'result': result});
            },
            (reject:any) => {
                console.log('LocalUserController getProfile promise reject : ', JSON.stringify(reject));
                res.status(500).send({'code':-1, 'message': 'failed'});
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}

export = {
    generateToken,
    signUp,
    getProfile
}
