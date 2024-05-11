// UV Service Worker
const swAllowedHostnames = ['localhost', '127.0.0.1'];

async function registerSW() {
  if (location.protocol !== 'https:' && !swAllowedHostnames.includes(location.hostname)) throw new Error('Service workers cannot be registered without https.');

  if (!navigator.serviceWorker) throw new Error("Your browser doesn't support service workers.");

  await navigator.serviceWorker
    .register('sw.js', {
      scope: __uv$config.prefix
    })
    .then(() => {
      console.log('Service Worker registered!');
    });
}

registerSW();

// Font Awesome
const fa = document.createElement('link');
fa.href = 'https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css';
fa.rel = 'stylesheet';
fa.type = 'text/css';
document.head.appendChild(fa);

// CSS Scripts
const hover = document.createElement('link');
hover.href = 'https://cdn.jsdelivr.net/gh/ianlunn/hover/css/hover-min.css';
hover.rel = 'stylesheet';
document.head.appendChild(hover);
