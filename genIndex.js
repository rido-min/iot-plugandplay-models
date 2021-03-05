const fs = require("fs")
const path = require("path")

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach(file => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })
  return arrayOfFiles
}

const allFiles = getAllFiles("dtmi")

const index = []

allFiles.forEach(async f => {
    const json = JSON.parse(fs.readFileSync(f, 'utf-8'))
    const id = json['@id']
    const displayName = json['displayName']
    const description = json['description']
    index.push({ id, displayName, description })
})
fs.writeFileSync('index.json', JSON.stringify(index, null, 2))
