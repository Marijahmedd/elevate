import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_CREDENTIALS } from "./aws";


const s3Client = new S3Client({
    region: "us-east-1",
    credentials: AWS_CREDENTIALS
});


export async function generatePresignedUrl(bucketName: string, objectKey: string, contentType: string, expiresInSeconds = 3600) {

    objectKey = `${objectKey}.pdf`
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
        ContentType: contentType,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: expiresInSeconds });
    return url;
}
