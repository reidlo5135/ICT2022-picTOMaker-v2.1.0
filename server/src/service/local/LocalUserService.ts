import {BaseLocalUser} from "../../models/BaseLocalUser";
import {BaseLocalUserToken} from "../../models/BaseLocalUserToken";
import {DatabaseError} from "sequelize";
import {JWT_SECRET_KEY} from "../../config/JwtConfig";

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
                      const access_token = jwt.sign({email: params.email}, JWT_SECRET_KEY);
                      console.log('LocalUser SVC generateToken password isSame : ', same);
                      console.log('LocalUser SVC generateToken access_token : ', access_token);

                      const refresh_token = jwt.sign({email: params.email}, JWT_SECRET_KEY);
                      console.log('LocalUser SVC generateToken refresh_token : ', refresh_token);

                      BaseLocalUserToken.findOrCreate({
                          where: {
                              email: params.email
                          },
                          defaults: {
                              email: params.email,
                              access_token,
                              expires_in: 21599,
                              provider: 'LOCAL',
                              refresh_token,
                              refresh_token_expires_in: 30000,
                              token_type: 'bearer'
                          }
                      }).then((result) => {
                          console.log('LocalUser SVC generateToken result : ', result);
                          resolve({
                              code: 0,
                              message: 'success'
                          });
                          return result;
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
               resolve({
                   code: 0,
                   message: 'success'
               });
               console.log('LocalUser SVC registerUser result : ', result);
               return result;
           }).catch((e:DatabaseError) => {
               console.error('LocalUser SVC registerUser error : ', e);
               reject(e);
           });
       });
    });
}

export = {
    login,
    registerUser
}