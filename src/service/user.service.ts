import * as jwt from 'jsonwebtoken';
import { compare, hash } from "bcrypt";
import User from "../models/user.model";
import { UserInterface } from "../interface/user.interface";
import { HttpException } from "../exceptions/httpException";
import { JWT_SECRET_KEY, EXPIRY } from '../config/config';

function createToken(user:User):string{
    return jwt.sign( { sub:user.id, userName:user.full_name }, JWT_SECRET_KEY as string, {expiresIn:EXPIRY} )
}


export async function createUser(userData: UserInterface):Promise<UserInterface>{
    try {
        const findUser:UserInterface | null = await User.findOne({where:{email:userData.email}})
        if (findUser) {
            throw new HttpException(409,`User already exist with ${userData.email}`)
          }
          const hashedPassword = await hash(userData.password, 10);
          userData.password = hashedPassword;
          const createUser: UserInterface= await User.create({
            ...userData
          })
        return createUser
    } catch (error) {
        throw error
    }
}

export async function login(email:string,password:string):Promise<{ user: User; tokenData: any }> {
    try {
        const user:User | null = await User.findOne({ where: { email }});
        if (!user) {
            throw new HttpException(404,' User Not Found')
        }
        if (!password || !user.password) {
            throw new HttpException(400, 'Password or user password is undefined');
        }
        const isValidPw = await compare(password,user.password);
        if (!isValidPw) throw new HttpException(401, 'Invalid Credentials'); 

        const tokenData = createToken(user);
        return {tokenData,user}
    } catch (error) {
        throw error
    }
}