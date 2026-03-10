import { Album } from 'src/albums/entities/album.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 120 })
    name: string;

    @Column({ unique: true, length: 180 })
    email: string;

    @Column({ select: false })
    password: string;

    @OneToMany(() => Album, (album) => album.user)
    albums: Album[];
}
