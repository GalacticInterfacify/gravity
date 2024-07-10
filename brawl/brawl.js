const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('../sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://playhop.com/dist-app/253517?skip-guard=1&header=no&flags={%22adv_sticky_banner_disabled%22:true}'; 
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});
