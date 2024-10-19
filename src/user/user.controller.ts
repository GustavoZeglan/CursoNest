import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("/")
    getUsers() {
        return this.userService.getUsers();
    }

    @Get("/:userId")
    getUserById(@Param("userId") userId: string) {
        return this.userService.getUserById(Number(userId));
    }

    @Post("/")
    createUser(@Body() user: CreateUserDTO) {
        return this.userService.createUser(user);
    }

    @Patch("/:userId")
    updateUser(@Param("userId") userId: string, @Body() user: UpdateUserDTO) {
       return this.userService.updateUser(Number(userId), user);
    }

}