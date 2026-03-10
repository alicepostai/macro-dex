import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, pass: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const isPasswordMatching = await bcrypt.compare(pass, user.password);
        if (!isPasswordMatching) {
            throw new UnauthorizedException('E-mail ou senha inválidos.');
        }

        const payload = { sub: user.id, email: user.email, name: user.name };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        };
    }
}
