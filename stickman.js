const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://cdn.bubbleshooter.net/games/stickman-hook/?gd_sdk_referrer_url=https://www.jopi.com/game/game/stickman-hook/';
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

