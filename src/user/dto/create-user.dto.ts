import { IsEmail, IsNotEmpty, Length, MaxLength, Min } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @Min(1)
    age: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;

}