import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import sharp from 'sharp';
import * as fs from 'fs';
import * as ExifParser from 'exif-parser';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async create(file: Express.Multer.File, albumId: string, title: string, description: string) {
    const filePath = file.path;
    const buffer = fs.readFileSync(filePath);

    const stats = await sharp(buffer).stats();
    const r = stats.channels[0].mean;
    const g = stats.channels[1].mean;
    const b = stats.channels[2].mean;

    const componentToHex = (c: number) => {
    const hex = Math.round(c).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
};

    const dominantColor = `#${Math.round(r).toString(16)}${Math.round(g).toString(16)}${Math.round(b).toString(16)}`;

    let acquisitionDate = new Date();
    try {
      const parser = ExifParser.create(buffer);
      const result = parser.parse();
      if (result.tags.DateTimeOriginal) {
        acquisitionDate = new Date(result.tags.DateTimeOriginal * 1000);
      }
    } catch (e) {
      console.log('Sem metadados EXIF');
    }

    const photo = this.photosRepository.create({
      title,
      description,
      sizeInBytes: file.size,
      dominantColor,
      acquisitionDate,
      url: filePath.replace(/\\/g, '/'),
      album: { id: albumId },
    });

    return this.photosRepository.save(photo);
  }
}