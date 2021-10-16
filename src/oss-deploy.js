let OSS = require('ali-oss')
let fs = require('fs')
const result = require('dotenv').config({ path: '.env' })
if (result.error) {
  throw result.error
}
const ossData = result.parsed

let client = new OSS({
  region: ossData.DB_REGION,
  //region:"oss-cn-shenzhen",
  accessKeyId: ossData.DB_ACCESSKEYId,
  accessKeySecret: ossData.DB_ACCESSKEYSECRET,
  bucket: ossData.DB_BUCKET,
})

async function put(fileName) {
  try {
    let result = await client.put(fileName, 'media/' + fileName)
    console.log('上传成功', fileName, result)
  } catch (e) {
    console.log('上传失败', fileName, e)
    // 失败以后的操作
  }
}

let readFileList = (path, filesList) => {
  let files = fs.readdirSync(path)
  //console.log(files);
  files.forEach(item => {
    if (item) {
      let stat = fs.statSync(path + item)
      if (stat.isDirectory()) {
        //console.log(path + item + '/', filesList);
        readFileList(path + item + '/', filesList)
      } else {
        filesList.push(path + item)
      }
    }
  })
  return filesList
}
let dist = readFileList('dist/', [])

let i = 0,
  l = dist.length

let uploadAsset = () => {
  if (i < l) {
    let name = dist[i].split('dist/')[1]
    put(name)
    i++
    uploadAsset()
  }
}

uploadAsset()
