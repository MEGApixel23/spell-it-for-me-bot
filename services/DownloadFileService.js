const request = require('request')

class DownloadFileService {
  static download (url) {
    return new Promise((resolve, reject) => (
      request({ url, encoding: null }, async (err, response, body) => {
        if (err) {
          return reject(err)
        }

        return resolve(body)
      })
    ))
  }
}

module.exports = DownloadFileService
