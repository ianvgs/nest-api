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

        const bucketName = this.configService.getOrThrow('BUCKET_NAME')
        const folderfilepath = `${folderName}/${fileName}`

        const result = await this.s3Client.send(new PutObjectCommand({
            Bucket: bucketName /* || 'bmizbucket' */,
            Key: folderfilepath,
            Body: file
        }))

        if (result) {
            return { createdUrl: `https://${bucketName}.s3.amazonaws.com/${folderName}/${fileName}` }
        }

    }
}
