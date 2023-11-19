const textArea = document.getElementsByTagName("textarea").item(0)
const overlay = document.getElementsByTagName("div").item(0)

textArea.addEventListener("input", (ev) => {
  // execute each line and put the result on the overlay
  const lines = textArea.value.split("\n")
  const results = lines.map((line) => {
    try {
      return eval(line)
    } catch (e) {
      return e
    }
  })
  overlay.innerHTML = results.join("<br>")
})
