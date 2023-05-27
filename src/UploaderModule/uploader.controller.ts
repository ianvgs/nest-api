import { Controller, Get, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploaderService } from './uploader.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiOperation } from '@nestjs/swagger';

@Controller('uploader')
export class UploaderController {

    constructor(private readonly uploaderService: UploaderService) { }

    @Get()
    @ApiOperation({
        summary: 'Pagina Inicial da aplicação de Notícias',
    })
    getUpoloeaderModule() {
        return 'Você acessou corretamente o módulo';
    }

    @Post('/:folderName')
    @UseInterceptors(FileInterceptor('image'))
    async uploadToBucket(@Param('folderName') folderName: string, @UploadedFile(new ParseFilePipe({
        validators: [
            //new MaxFileSizeValidator({ maxSize: 10000 }),
            //new FileTypeValidator({ fileType: 'image/jpeg' })
        ]
    }))
    file: Express.Multer.File) {

        return await this.uploaderService.uploadToS3(folderName, file.originalname, file.buffer)
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
