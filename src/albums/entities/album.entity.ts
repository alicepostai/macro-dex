import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('album')
export class Album {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @OneToMany(() => Photo, (photo) => photo.album)
    photos: Photo[];

    @ManyToOne(() => User, (user) => user.album)
    user: User;
}
