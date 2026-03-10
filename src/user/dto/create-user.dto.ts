import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    name: string;

    @IsEmail({}, { message: 'Endereço de e-mail inválido.' })
    email: string;

    @IsStrongPassword(
        {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        },
        {
            message:
                'A senha deve ter no mínimo 8 caracteres e conter ao menos uma letra maiúscula, uma minúscula, um número e um símbolo.',
        },
    )
    password: string;
}
