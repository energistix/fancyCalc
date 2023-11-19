// serve staticaly files in public server with fastify
import fastify from "fastify"
import fastifyStatic from "@fastify/static"
import path from "node:path"

const server = fastify({ logger: true })

server.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
  prefix: "/",
})

server.listen(
  {
    port: 3000,
  },
  (err, address) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
  }
)
