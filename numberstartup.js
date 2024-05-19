const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://gr4vity.pages.dev/2048/2048'; //url
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

