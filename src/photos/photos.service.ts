import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Album } from 'src/albums/entities/album.entity';
import sharp from 'sharp';
import * as fs from 'fs';
import * as ExifParser from 'exif-parser';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(Photo)
        private readonly photosRepository: Repository<Photo>,
        @InjectRepository(Album)
        private readonly albumsRepository: Repository<Album>,
    ) {}

    async create(
        file: Express.Multer.File,
        albumId: string,
        title: string,
        description: string | undefined,
        userId: string,
    ) {
        const album = await this.albumsRepository.findOne({
            where: {
                id: albumId,
                user: { id: userId },
            },
        });

        if (!album) {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw new NotFoundException('Álbum não encontrado.');
        }

        const filePath = file.path;
        const buffer = fs.readFileSync(filePath);

        const stats = await sharp(buffer).stats();
        const r = stats.channels[0]?.mean ?? 0;
        const g = stats.channels[1]?.mean ?? 0;
        const b = stats.channels[2]?.mean ?? 0;

        const componentToHex = (value: number) => {
            const hex = Math.round(value).toString(16).padStart(2, '0');
            return hex;
        };

        const dominantColor = `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

        let acquisitionDate = new Date();

        try {
            const parser = ExifParser.create(buffer);
            const result = parser.parse();

            if (result.tags.DateTimeOriginal) {
                acquisitionDate = new Date(result.tags.DateTimeOriginal * 1000);
            }
        } catch {
            acquisitionDate = new Date();
        }

        const photo = this.photosRepository.create({
            title,
            description: description || '',
            sizeInBytes: file.size,
            dominantColor,
            acquisitionDate,
            url: filePath.replace(/\\/g, '/'),
            album: { id: albumId },
        });

        return this.photosRepository.save(photo);
    }

    async remove(id: string, userId: string) {
        const photo = await this.photosRepository.findOne({
            where: {
                id,
                album: {
                    user: { id: userId },
                },
            },
            relations: ['album', 'album.user'],
        });

        if (!photo) {
            throw new NotFoundException('Foto não encontrada.');
        }

        if (photo.url && fs.existsSync(photo.url)) {
            fs.unlinkSync(photo.url);
        }

        await this.photosRepository.remove(photo);

        return {
            message: 'Foto excluída com sucesso.',
        };
    }
}
