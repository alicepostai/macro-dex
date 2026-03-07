import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('photos')
export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'timestamp'})
    acquisitionDate: Date;

    @Column({type: 'integer'})
    byteSize: number;

    @Column({nullable: true})
    dominantColor: string;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;
}
