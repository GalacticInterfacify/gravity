const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://let3r45jj02l930rzh903me09f3g9lhh5fz66play356hhjz30.com/lol/'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

