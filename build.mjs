import * as esbuild from "esbuild"
import fs from "fs/promises"

const dev = process.argv.includes("--dev")

const nodeContext = await esbuild.context({
  entryPoints: ["back/index.ts"],
  outdir: "dist",
  platform: "node",
  ...(dev ? {} : { drop: ["console", "debugger"] }),
  loader: { ".ts": "ts" },
  format: "cjs",
})

const frontContext = await esbuild.context({
  entryPoints: ["front/index.ts"],
  outdir: "public",
  platform: "browser",
  ...(dev ? {} : { drop: ["console", "debugger"] }),
})

nodeContext.rebuild()
frontContext.rebuild()

if (dev) {
  console.log("Watching...")
  // execute watchBack and watchFront concurently
  await Promise.all([watchBack(), watchFront()])
} else {
  console.log("Done.")
  nodeContext.dispose()
}
async function watchFront() {
  const watcherFront = fs.watch("front", { recursive: true })
  for await (const event of watcherFront) {
    console.log(`${event.filename} was ${event.eventType}d, rebuilding`)
    const start = Date.now()
    await frontContext.rebuild().catch((err) => console.error(err))
    console.log(`rebuilt in ${Date.now() - start}ms`)
  }
}

async function watchBack() {
  const watcherBack = fs.watch("back", { recursive: true })
  for await (const event of watcherBack) {
    console.log(`${event.filename} was ${event.eventType}d, rebuilding`)
    const start = Date.now()
    await nodeContext.rebuild().catch((err) => console.error(err))
    console.log(`rebuilt in ${Date.now() - start}ms`)
  }
}
