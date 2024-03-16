import  { NextFunction, Request, Response } from 'express';
import { UserInterface } from '../interface/user.interface';
import * as userService from '../service/user.service'
import { HttpException } from '../exceptions/httpException';

export const createUser =async (req: Request, res: Response,next:NextFunction) => {
    try {
        const UserData:UserInterface = req.body;
        const createUserData = await userService.createUser(UserData);
        res.status(201).json({
            message:"User created",
            user:createUserData
        }
        )
    } catch (error) {
      next(error)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            throw new HttpException(400,'Something went wrong')
        }
    const { user, tokenData } = await userService.login(email,password)
    res.setHeader('Authorization',tokenData);
        res.status(200).json({
            message:"User logged in succesfully",
            user:{
                userEmail:user.email
            }
        })
    } catch (error) {
        next(error);
    }
}
