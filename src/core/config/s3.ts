import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

import config from './index';

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION,
});

const storageType = multerS3({
  s3: new AWS.S3(),
  bucket: config.AWS_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (_, file, cb) => {
    const fileName: string = `${Date.now().toString()} - ${file.originalname}`;
    cb(null, fileName);
  },
});

export default {
  storage: storageType,
  limits: {
    fileSize: config.MAX_UPLOAD_SIZE,
  },
};
