// model server to hack three.js file-loader
import * as http from 'http'
import * as fs from 'fs'

class ModelServer {
  run(port: number) {
    http
      .createServer(function(request, response) {
        const path = request.url.replace('/?path=', '')
        response.end(fs.readFileSync(path))
      })
      .listen(port)
  }
}

export default new ModelServer()
