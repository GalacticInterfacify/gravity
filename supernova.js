const form = document.querySelector('form');
const input = document.querySelector('input');
const blacklist = ['tiktok.com']; // Array of blacklisted domains

form.addEventListener('submit', async event => {
    event.preventDefault();
    window.navigator.serviceWorker.register('./sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        let url = input.value.trim();
        
        // Blacklist check
        if (isBlacklisted(url)) {
            alert('You are not allowed to use this URL with SUPERNOVA. Be smart with what you use.');
            return;
        }
        
        if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
        else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
}

function isBlacklisted(url) {
    const urlObj = new URL(url.startsWith('http') ? url : 'http://' + url);
    return blacklist.some(domain => urlObj.hostname.includes(domain));
}
