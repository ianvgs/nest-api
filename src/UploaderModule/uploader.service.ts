import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UploaderService {

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    })
    constructor(private readonly configService: ConfigService,
    ) { }

    async uploadToS3(folderName: string, fileName: string, file: Buffer) {
        const folderfilepath = `${folderName}/${fileName}`;
        await this.s3Client.send(new PutObjectCommand({
            Bucket: this.configService.getOrThrow('BUCKET_NAME') /* || 'bmizbucket' */,
            Key: folderfilepath,
            Body: file
        }))
        //presignedUrl = expires //cria uma url de acesso que expira...
        //
    }
}
