// Convert Hugo code-fence mermaid blocks (pre > code.language-mermaid)
// into elements Mermaid.js can render (pre.mermaid), then run Mermaid.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("pre code.language-mermaid").forEach(function (code) {
    var pre = code.parentElement;
    var mermaidPre = document.createElement("pre");
    mermaidPre.className = "mermaid";
    mermaidPre.textContent = code.textContent;
    pre.parentNode.replaceChild(mermaidPre, pre);
  });

  if (document.documentElement.classList.contains("dark")) {
    initMermaidDark();
  } else {
    initMermaidLight();
  }

  mermaid.run();
});
