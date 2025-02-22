const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = 'https://gr4vity.pages.dev/hyperjump'; // Set the URL to always use "https://gr4vity.pages.dev/portal"
        
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

// Remove the isUrl function as it's not needed anymore
