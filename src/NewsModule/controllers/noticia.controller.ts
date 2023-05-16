/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Noticia } from '../entities/noticia.entity';
import { UcRecuperarTodasNoticias } from '../useCases/noticiaUseCases/ucRecuperarTodasNoticias';
import { UcCadastrarNoticia } from '../useCases/noticiaUseCases/UcCadastrarNoticia';
import { UcRecuperarNoticiaPorId } from '../useCases/noticiaUseCases/UcRecuperarNoticiaPorId';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';



@ApiTags('noticia')
@Controller('news/noticia')
export class NoticiaController {
    constructor(
        private readonly ucRecuperarTodasNoticias: UcRecuperarTodasNoticias,
        private readonly ucCadastrarNoticia: UcCadastrarNoticia,
        private readonly ucRecuperarNoticiaPorId: UcRecuperarNoticiaPorId

    ) { }

    @Get()
    @ApiOperation({
        summary: 'Metodo Get do IdeiaController',
    })
    async getTodasNoticias(): Promise<Noticia[]> {
        return await this.ucRecuperarTodasNoticias.run();
    }

    @Post()
    async createNoticia(@Body() body: any): Promise<any> {
        console.log(body)
        return await this.ucCadastrarNoticia.run(body);
    }

    @Get('/:idNoticia')
    @ApiOperation({
        summary: 'Obtem os dados/ideias referentes ao evento informado em /evento/${idEvento}',
    })
    async getCategoriaEspecifica(@Param('idNoticia') idNoticia: number, @Req() req: Request): Promise<Noticia> {
        const idSite = Number(req?.query.idSite);
        return await this.ucRecuperarNoticiaPorId.run(idNoticia, idSite);
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const extension = extname(file.originalname);
                callback(null, file.fieldname + '-' + uniqueSuffix + extension);
            },
        }),
    }))
    async uploadFile(@UploadedFile() file: any) {
        return { uploadedImageFile: file };
    }




}
