import { getRepository } from 'typeorm';
import User from '../models/User';
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';


interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string
}

class AuthenticateUserService {
    public async execute({email, password}: Request): Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            throw new AppError('Incorrect email or password provided.', 401)
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Incorrect email or password provided.', 401)
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token
        };
    }
}

export default AuthenticateUserService;