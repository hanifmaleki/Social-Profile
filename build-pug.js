const pug = require('pug')
const fs = require('fs')
const path = require('path')

const languages = [
    {
        'code': 'en',
        'name': 'English'
    },
    {
        'code': 'de',
        'name': 'Deutsch'
    }
]

const translations = {}

languages.forEach(language => {
    translations[language.code] = JSON.parse(fs.readFileSync(`translations/${language.code}.json`))
})

function getAssetPath(relativePath) {
    return path.join('/assets', relativePath)
}

const compiled = pug.renderFile('src/pug/index.pug', {
    pretty: true,
    translations,
    languages,
    getAssetPath,
})

const distDirectoryPath = 'dist'

if (!fs.existsSync(distDirectoryPath)) {
    fs.mkdirSync('dist')
}

fs.writeFileSync(path.join(distDirectoryPath, 'index.html'), compiled)
