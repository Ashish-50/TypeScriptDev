import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpException";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
import User from "../models/user.model";
import { RequestWithUser } from "../interface/auth.interface";

const getAuthorization = (req: Request) => {
    const header = req.header('Authorization');
    if (header) return header.split('Bearer ')[1];
    return null;
};

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const decodeToken = verify(Authorization, JWT_SECRET_KEY as string);
            if (decodeToken) {
                const user = await User.findByPk(decodeToken.sub as string);
                if (user) {
                    req.user  = user;
                    next();
                } else {
                    next(new HttpException(401, 'Wrong authentication token'));
                }
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};
