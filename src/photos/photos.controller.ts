import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Request,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from './photos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { multerConfig } from './multer.config';

@Controller('photos')
@UseGuards(JwtAuthGuard)
export class PhotosController {
    constructor(private readonly photosService: PhotosService) {}

    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', multerConfig))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreatePhotoDto,
        @Request() req,
    ) {
        if (!file) {
            throw new BadRequestException('Arquivo não enviado.');
        }

        return this.photosService.create(
            file,
            body.albumId,
            body.title,
            body.description,
            req.user.userId,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.photosService.remove(id, req.user.userId);
    }
}
