const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://gravity-on-top.pages.dev/1v1.html'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});
