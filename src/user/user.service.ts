import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {

    private lastId: number = 1;
    private users = [
        {
            id: 1,
            name: "JamalOlinda",
            age: 19
        }
    ];


    getUsers() {
        return this.users;
    }

    getUserById(userId: number) {
        const user = this.users.find((user) => user.id === userId)

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return user;
    }

    createUser(user: CreateUserDTO) {
        const newUser = {
            id: ++this.lastId, 
            ...user
        }

        this.users.push(newUser);

        return newUser;
    }

    updateUser(userId: number, user: UpdateUserDTO) {

        const userIndex = this.users.findIndex((user) => user.id === userId);
        
        if (userIndex === -1) {
            throw new NotFoundException("User not found.");
        }

        const userToUpdate = this.users[userIndex];

        const updatedUser = {
            ...userToUpdate,
            ...user
        }

        this.users[userIndex] = updatedUser;

        return updatedUser;
    }

}
