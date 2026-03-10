import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { email, password, name } = createUserDto;

        const userExists = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'name'],
        });

        if (userExists) {
            throw new ConflictException(
                'Este e-mail já possui cadastro no sistema.',
            );
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await this.usersRepository.save(user);

        return {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password', 'name'],
        });
    }
}
