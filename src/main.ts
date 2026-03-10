import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import * as express from 'express';
import * as fs from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
    if (!fs.existsSync(join(process.cwd(), 'uploads'))) {
        fs.mkdirSync(join(process.cwd(), 'uploads'), { recursive: true });
    }

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
    app.enableCors();

    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
