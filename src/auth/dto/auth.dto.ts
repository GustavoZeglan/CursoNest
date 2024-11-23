import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Length(8, 20)
    password: string;
}