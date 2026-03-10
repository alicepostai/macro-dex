import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Endereço de e-mail inválido.' })
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
