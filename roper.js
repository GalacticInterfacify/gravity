const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://gamernet.org/embed/roper-pass-game'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

