import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @OneToMany(() => Photo, (photo) => photo.album)
    photos: Photo[];

    @ManyToOne(() => User, (user) => user.albums)
    user: User;
}
