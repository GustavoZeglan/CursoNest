import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './data/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}


    async getUsers() {
        const users = await this.userRepository.find({
            select: ["id", "name", "age", "email"]
        });

        return users;
    }

    async getUserById(userId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
            select: ["id", "name", "age", "email"]
        })

        if(!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    createUser(user: CreateUserDTO) {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    updateUser(userId: number, user: UpdateUserDTO) {
        const usersCount = this.userRepository.countBy({
            id: userId
        });

        if (!usersCount) {
            throw new NotFoundException("User not founf");
        }

        const userForUpdate = this.userRepository.create({
            ...user,
            id: userId,
        });

        return this.userRepository.save(userForUpdate);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                email
            }
        });
    }

}
