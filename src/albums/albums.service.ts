import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
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
    });
  }
}
