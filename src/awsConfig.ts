import { S3Client } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  credentials: {
    accessKeyId: 'a92d18a3d8e4c0daacbd2e4848d3e5c0',
    secretAccessKey:
      '1f995aa0af0b450101c760c0aae8b311d288e6fc0bead0023932107b2addbf39',
  },
  endpoint: 'https://mwqduryxipoicxdoxzeg.storage.supabase.co/storage/v1/s3',
  region: 'ap-southeast-1',
  forcePathStyle: true,
})
export default s3Client
