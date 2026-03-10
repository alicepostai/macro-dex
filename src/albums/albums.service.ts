import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album)
        private readonly albumsRepository: Repository<Album>,
    ) {}

    async create(createAlbumDto: CreateAlbumDto, userId: string) {
        const album = this.albumsRepository.create({
            ...createAlbumDto,
            user: { id: userId },
        });

        return this.albumsRepository.save(album);
    }

    async findAllByUser(userId: string) {
        return this.albumsRepository.find({
            where: { user: { id: userId } },
            relations: ['photos'],
            order: {
                title: 'ASC',
                photos: {
                    acquisitionDate: 'DESC',
                },
            },
        });
    }

    async findOneByUser(id: string, userId: string) {
        const album = await this.albumsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['photos'],
            order: {
                photos: {
                    acquisitionDate: 'DESC',
                },
            },
        });

        if (!album) {
            throw new NotFoundException('Álbum não encontrado');
        }

        return album;
    }

    async update(id: string, updateDto: UpdateAlbumDto, userId: string) {
        const album = await this.albumsRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!album) {
            throw new NotFoundException('Álbum não encontrado');
        }

        Object.assign(album, updateDto);

        return this.albumsRepository.save(album);
    }

    async remove(id: string, userId: string) {
        const album = await this.albumsRepository.findOne({
            where: { id, user: { id: userId } },
            relations: ['photos'],
        });

        if (!album) {
            throw new NotFoundException('Álbum não encontrado');
        }

        if (album.photos && album.photos.length > 0) {
            throw new BadRequestException(
                'Não é possível excluir um álbum que contém fotos. Apague as fotos primeiro.',
            );
        }

        await this.albumsRepository.remove(album);

        return {
            message: 'Álbum excluído com sucesso.',
        };
    }
}
