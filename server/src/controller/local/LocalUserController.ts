import {Request, Response, NextFunction} from "express";
const svc = require('../../service/local/LocalUserService');

const generateToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const params = {
            email : req.body.email,
            password : req.body.password
        };
        console.log('LocalUserController generateToken email : ', params.email, ', password : ', params.password);
        const result = svc.login(params);
        console.log('LocalUserController generateToken result : ', result);
        res.send({code:0, message:'success', result});
    } catch (e) {
        res.send(e);
    }
}

const signUp = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const params = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            nick_name: req.body.nickName
        }
        console.log('LocalUserController signUp params : ', params);
        const result = svc.registerUser(params);
        console.log('LocalUserController signUp result : ', result);
        res.send({code:0, message:'success', result});
    } catch (e) {
        res.send(e);
    }
}

const getProfile = async (req:Request, res:Response, next:NextFunction) => {
    const access_token = req.body.access_token;
    console.log('LocalUserController getProfile access_token : ', access_token);
    try {
        const result = svc.userProfile(access_token);
        res.send({code:0, message:'success', result});
    } catch (e) {
        res.send(e);
    }
}

export = {
    generateToken,
    signUp,
    getProfile
}