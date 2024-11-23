import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {

    constructor(private readonly configService: ConfigService) {
        // Validar os valores das variáveis de ambiente
    }

    get serverPort(): number {
        return this.configService.get<number>('SERVER_PORT') ?? 3000;
    }

    get databaseSynchronization(): boolean {
        return this.configService.get<boolean>('DATABASE_SYNCHRONIZATION') ?? false;
    }

    get jwtKey(): string | undefined {
        return this.configService.get<string>('JWT_KEY');
    }

}
