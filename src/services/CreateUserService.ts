import { getRepository } from 'typeorm';
import User from '../models/User'
import {hash} from 'bcryptjs'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({name, email, password}: Request): Promise<User> {
        const usersRepository = getRepository(User);
        const checkEmail = await usersRepository.findOne({
            where: {email},
        });

        if (checkEmail) {
            throw new Error('Email address already used')
        }

        const hashedPass = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email, 
            password: hashedPass
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;