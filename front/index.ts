const editor = document.getElementById("input") as HTMLTextAreaElement
const overlay = document.getElementById("overlay")
const lines = document.getElementById("lines")

const editorEdit = () => {
  const text = editor.value
  const textLines = text.split("\n")
  let linesString = ""

  for (const lineIndex in textLines) {
    linesString += `${Number(lineIndex) + 1}<br>`
  }

  lines.innerHTML = linesString
  lines.style.width = `${
    Math.max(Math.ceil(Math.log10(textLines.length + 1)), 1) * 10
  }px`

  editor.style.width = `calc(100vw - ${lines.style.width} - 5px)`
  overlay.style.width = `calc(100vw - ${lines.style.width} - 5px)`

  editor.style.height = `${Math.min(
    editor.scrollHeight,
    textLines.length * 20
  )}px`
  overlay.style.height = `${Math.min(
    editor.scrollHeight,
    textLines.length * 20
  )}px`
}

editor.addEventListener("input", editorEdit)
editorEdit()
