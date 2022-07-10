import {BaseLocalUser} from "../../models/BaseLocalUser";
import {BaseLocalUserToken} from "../../models/BaseLocalUserToken";
import {DatabaseError} from "sequelize";
import {jwtConfig} from "../../config/JwtConfig";

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function login(params:any): Promise<any> {
    console.log('LocalUser SVC generateToken params : ', params);
    return new Promise<any>((resolve, reject) => {
        BaseLocalUser.findOne({
            where: {
                email: params.email,
            }
        }).then((result) => {
           if(result !== null) {
               bcrypt.compare(params.password, result.password, (err:Error, same:Boolean) => {
                  if(same) {
                      const access_token = jwt.sign({email: params.email}, jwtConfig.JWT_SECRET_KEY, {expiresIn: jwtConfig.JWT_TOKEN_LIFE});
                      console.log('LocalUser SVC generateToken password isSame : ', same);
                      console.log('LocalUser SVC generateToken access_token : ', access_token);

                      const refresh_token = jwt.sign({email: params.email}, jwtConfig.JWT_REFRESH_KEY, {expiresIn: jwtConfig.JWT_REFRESH_TOKEN_LIFE});
                      console.log('LocalUser SVC generateToken refresh_token : ', refresh_token);

                      BaseLocalUserToken.findOrCreate({
                          where: {
                              email: params.email
                          },
                          defaults: {
                              email: params.email,
                              access_token,
                              expires_in: jwtConfig.JWT_TOKEN_LIFE,
                              provider: 'LOCAL',
                              refresh_token,
                              refresh_token_expires_in: jwtConfig.JWT_REFRESH_TOKEN_LIFE,
                              token_type: 'bearer'
                          }
                      }).then((result) => {
                          console.log('LocalUser SVC generateToken result : ', result);
                          resolve(result);
                      });
                  } else {
                      throw new Error('LocalUser SVC generateToken ERROR occurred');
                  }
               });
           }
        }).catch((e:DatabaseError) => {
            console.error('LocalUser SVC login error : ', e);
            reject(e);
        });
    });
};

function registerUser(params:any): Promise<any> {
    console.log('LocalUser SVC registerUser params : ', params);
    return new Promise<any>((resolve, reject) => {
       bcrypt.hash(params.password, 10, (err:Error, encodedPassword:string) => {
           BaseLocalUser.findOrCreate({
               where: {
                   email: params.email
               },
               defaults: {
                   email: params.email,
                   password: encodedPassword,
                   name: params.name,
                   nick_name: params.nick_name,
                   profile_image_url: '',
                   provider: 'LOCAL'
               }
           }).then((result) => {
               console.log('LocalUser SVC registerUser result : ', result);
               resolve(result);
           }).catch((e:DatabaseError) => {
               console.error('LocalUser SVC registerUser error : ', e);
               reject(e);
           });
       });
    });
}

function userProfile(access_token:string): Promise<any> {
    console.log('LocalUser SVC userProfile access_token : ', access_token);
    return new Promise<any>((resolve, reject) => {
        BaseLocalUserToken.findOne({
          where: {
              access_token
          }
        }).then((result) => {
            return BaseLocalUser.findAll({
                where: {
                    email: result?.email
                }
            }).then((result) => {
                console.log('LocalUser SVC userProfile result : ', result);
                resolve(result);
            });
        }).catch((e:DatabaseError) => {
            console.error('LocalUser SVC userProfile error : ', e);
            reject(e);
        });
    });
}

export = {
    login,
    registerUser,
    userProfile
}