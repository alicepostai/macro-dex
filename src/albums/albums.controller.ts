import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
@UseGuards(JwtAuthGuard)
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) {}

    @Post()
    create(@Body() createAlbumDto: CreateAlbumDto, @Request() req) {
        return this.albumsService.create(createAlbumDto, req.user.userId);
    }

    @Get()
    findAll(@Request() req) {
        return this.albumsService.findAllByUser(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.albumsService.findOneByUser(id, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateAlbumDto: UpdateAlbumDto,
        @Request() req,
    ) {
        return this.albumsService.update(id, updateAlbumDto, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req) {
        return this.albumsService.remove(id, req.user.userId);
    }
}
