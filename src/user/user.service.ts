import { HttpException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUser(user_id): Promise<User | null> {
        let id = Number(user_id);
        const user = await this.userRepository.findOneBy({user_id});
        if (user) {
            return user;
        }
        throw new HttpException('User does not exist!', 404);
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({'email': email});
        return user;
    }
}
