import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    login(@Body() body: AuthDto) {
        return this.authService.login(body);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
        return this.authService.getProfile(req['user'].sub);
    }

}
