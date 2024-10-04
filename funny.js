const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://html5.gamedistribution.com/a1b7ac4025214a5cb0bd01a4f675513a/'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

