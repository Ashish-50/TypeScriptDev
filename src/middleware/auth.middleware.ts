import { NextFunction } from "express";
import { RequestWithUser } from "../interface/auth.interface";
import { HttpException } from "../exceptions/httpException";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
import User from "../models/user.model";



const getAuthorization = (req: RequestWithUser) => {
    const header = req.header('Authorization');
    if (header) return header.split('Bearer ')[1];
    return null;
  };
  
  export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const Authorization = getAuthorization(req);
      if (Authorization) {
        const decodeToken = verify(Authorization, JWT_SECRET_KEY as string)
        console.log()
        const user = await User.findByPk(decodeToken.sub as string);
        console.log(user,'--------')
        if (decodeToken) {
          req.user = user!;
          next();
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