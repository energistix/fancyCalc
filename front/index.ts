import { evaluate } from "mathjs"

const textArea = document.getElementsByTagName("textarea").item(0)
const overlay = document.getElementsByTagName("div").item(0)

textArea.addEventListener("input", (ev) => {
  // execute each line and put the result on the overlay
  const lines = textArea.value.split("\n")
  const values: Record<string, string> = {}
  const results = lines.map((line) => {
    let name = ""
    const match = line.match(/^(.+?)\s*=/)

    if (match) {
      name = match[1]
      line = line.replace(/^(.+?)\s*=\s*/, "")
    }

    for (const [name, value] of Object.entries(values)) {
      line = line.replace(new RegExp(`\\b${name}\\b`, "g"), value)
    }

    try {
      const result = evaluate(line)
      if (name !== "") {
        values[name] = result
      }
      return result
    } catch (e) {
      return e
    }
  })
  overlay.innerHTML = results.join("<br>")
})
