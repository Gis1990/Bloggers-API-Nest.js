import { Injectable } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class S3StorageAdapter {
    private s3Client: S3Client;

    constructor(private configService: ConfigService) {
        const REGION = "eu-central-1";
        this.s3Client = new S3Client({
            region: REGION,
            credentials: {
                accessKeyId: this.configService.get<string>("aws_access_key_id"),
                secretAccessKey: this.configService.get<string>("aws_secret_access_key"),
            },
            endpoint: "https://s3.eu-central-1.amazonaws.com",
        });
    }

    public async saveFile(blogId: string, originalName: string, userId: string, buffer: Buffer): Promise<any> {
        const bucketParams = {
            Bucket: "bloggersbucket",
            Key: `${userId}/${blogId}/${uuidv4()}`,
            Body: buffer,
            ContentType: "image/png",
        };
        const command = new PutObjectCommand(bucketParams);
        try {
            await this.s3Client.send(command);
        } catch (e) {
            throw new Error(e);
        }
        return {
            url: `https://bloggersbucket.s3.eu-central-1.amazonaws.com/${bucketParams.Key}`,
        };
    }
}
