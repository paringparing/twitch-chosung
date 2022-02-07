import 'dotenv/config'
import chokidar from 'chokidar'
import * as http from 'http'
import path from 'path'

const isDev = process.env.NODE_ENV !== 'production'

const run = async () => {
  let app = (await import('./web')).default

  const server = http.createServer((req, res) => {
    return app(req, res)
  })

  server.listen(process.env.PORT, () => console.log('Listening'))

  if (isDev) {
    chokidar.watch(path.join(__dirname, 'web/')).on('change', async () => {
      Object.keys(require.cache)
        .filter((x) => x.startsWith(path.join(__dirname, 'web/')))
        .forEach((x) => delete require.cache[x])
      app = (await import('./web')).default
      console.log('reloaded server')
    })
    console.log('Watching files to reload')
  }
}

run().then()
