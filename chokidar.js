const chokidar = require('chokidar')
const { spawn } = require('child_process')

function run(command) {
    const [cmd, ...args] = command.split(' ')
    spawn(cmd, args, { stdio: 'inherit', shell: true })
}

chokidar.watch('src/js').on('all', () => {
    run('npm run copy-js-assets')
})

chokidar.watch('assets').on('all', () => {
    run('npm run copy-js-assets')
})

chokidar.watch('src/pug').on('all', () => {
    run('npm run pug')
})

chokidar.watch('src/scss').on('all', () => {
    run ('npm run scss')
})
