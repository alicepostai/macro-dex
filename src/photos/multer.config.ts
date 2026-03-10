import { diskStorage } from 'multer';
import { extname } from 'path';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const multerConfig: MulterOptions = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
                null,
                `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
        },
    }),
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/)) {
            return cb(
                new BadRequestException(
                    'Apenas imagens JPG, JPEG, PNG ou GIF são permitidas.',
                ),
                false,
            );
        }
        cb(null, true);
    },
};
