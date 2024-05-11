const input = document.querySelector(".pxyinput"); // Corrected input selector

input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(search(input.value));
    window.location.href = encodedUrl;
  }
});

var params = new URLSearchParams(window.location.search);
console.log("Searching for " + params.get("q"));
if (params.get("q")) {
  const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(search(params.get("q")));
  window.location.href = encodedUrl;
}

function search(input) {
  try {
    // input is a valid URL:
    return new URL(input).toString();
  } catch (err) {
    // input was not a valid URL
  }

  try {
    // input is a valid URL when http:// is added to the start:
    const url = new URL(`http://${input}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    // input was not valid URL
  }

  // Treat the input as a search query
  return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
}
