import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private readonly bucketName = process.env.AWS_S3_BUCKET_NAME;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: fromEnv(),
    });
  }

  async uploadFile(fileName: string, content: string): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: content,
        ContentType: 'application/json',
      });

      await this.s3.send(command);
    } catch (error) {
      console.error('Erro ao enviar arquivo para o S3:', error);
      throw error;
    }
  }
}
