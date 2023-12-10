(() => {
  // front/index.ts
  var editor = document.getElementById("input");
  var overlay = document.getElementById("overlay");
  var lines = document.getElementById("lines");
  var editorEdit = () => {
    const text = editor.value;
    const textLines = text.split("\n");
    let linesString = "";
    for (const lineIndex in textLines) {
      linesString += `${Number(lineIndex) + 1}<br>`;
    }
    lines.innerHTML = linesString;
    lines.style.width = `${Math.max(Math.ceil(Math.log10(textLines.length + 1)), 1) * 10}px`;
    editor.style.width = `calc(100vw - ${lines.style.width} - 5px)`;
    overlay.style.width = `calc(100vw - ${lines.style.width} - 5px)`;
    editor.style.height = `${Math.min(
      editor.scrollHeight,
      textLines.length * 20
    )}px`;
    overlay.style.height = `${Math.min(
      editor.scrollHeight,
      textLines.length * 20
    )}px`;
  };
  editor.addEventListener("input", editorEdit);
  editorEdit();
})();
