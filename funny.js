const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://rawcdn.githack.com/nightrose-labs/quartz/master/1/6af3cc65-32f9-4f3d-a66c-6c8882a7c5df/index.html'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

