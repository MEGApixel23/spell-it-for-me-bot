const AWS = require('aws-sdk')

const DownloadFileService = require('./DownloadFileService')

class StorageService {
  constructor ({ BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY }) {
    this.s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    })
    this.bucket = BUCKET
  }

  async storeVoice (url, filename) {
    const body = await DownloadFileService.download(url)
    const s3Params = {
      Bucket: this.bucket,
      Key: `voice/${filename}`,
      Body: body,
      ContentType: 'audio/ogg'
    }

    return this.s3.upload(s3Params).promise()
  }
}

module.exports = StorageService
