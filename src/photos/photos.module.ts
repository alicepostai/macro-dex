import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from 'src/albums/entities/album.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Photo, Album])],
    controllers: [PhotosController],
    providers: [PhotosService],
})
export class PhotosModule {}
