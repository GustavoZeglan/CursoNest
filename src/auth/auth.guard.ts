import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService) {}

    extractAuthorizationToken(request: Request): string | undefined {
        const [tokenType, token] = request.headers.authorization?.split(' ') || [];
    
        if(tokenType?.toLowerCase() !== 'bearer') {
            return undefined;
        }

        return token;
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req  = context.switchToHttp().getRequest() as Request;
        const token = this.extractAuthorizationToken(req);

        if (!token) {
            throw new UnauthorizedException('Token de autenticação não encontrado');
        }

        try {
            const payload = this.jwtService.verify(token);
            req['user'] = payload;
            return true
        } catch (e) {
            throw new UnauthorizedException('Token de autenticação não inválido');
        }

    }

}