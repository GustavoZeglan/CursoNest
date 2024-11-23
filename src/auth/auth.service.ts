import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(body: AuthDto) {
        
        const user = await this.userService.getUserByEmail(body.email);

        if (user?.password !== body.password) {
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload = { email: user.email, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload, {
                expiresIn: "7d"
            })
        }
    }

    getProfile(userId: number) {
        return this.userService.getUserById(userId);
    }

}
