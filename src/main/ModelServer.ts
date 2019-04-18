// model server to hack three.js file-loader
import * as http from 'http'
import * as fs from 'fs'
import kill from 'kill-port'

class ModelServer {
  port: number
  constructor(port: number) {
    this.port = port
  }
  run() {
    http
      .createServer(function(request, response) {
        const path = request.url.replace('/?path=', '')
        response.end(fs.readFileSync(path))
      })
      .listen(this.port)
  }

  stop() {
    return kill(this.port)
  }
}

export default new ModelServer(7777)
