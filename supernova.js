const form = document.querySelector('form');
const input = document.querySelector('input');
const blacklist = ['tiktok.com']; // Array of blacklisted domains
let iframe;
let historyLog = [];
let historyIndex = -1;

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

        loadIframe(__uv$config.prefix + __uv$config.encodeUrl(url));
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

function loadIframe(url) {
    // Clear previous content
    document.body.innerHTML = '';

    // Create navigation bar
    const navBar = document.createElement('div');
    navBar.style.display = 'flex';
    navBar.style.justifyContent = 'space-between';
    navBar.style.position = 'fixed';
    navBar.style.top = '0';
    navBar.style.width = '100%';
    navBar.style.backgroundColor = '#ccc';
    navBar.style.padding = '10px';
    navBar.style.zIndex = '1000';

    // Create buttons
    const backButton = createButton('Back', () => navigateHistory(-1));
    const forwardButton = createButton('Forward', () => navigateHistory(1));
    const reloadButton = createButton('Reload', () => iframe.contentWindow.location.reload());
    const homeButton = createButton('Home', () => window.location.reload());
    const launchButton = createButton('Launch', () => openSite('supernova.html'));

    // Append buttons to nav bar
    navBar.append(backButton, forwardButton, reloadButton, homeButton, launchButton);
    document.body.appendChild(navBar);

    // Create iframe
    iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100vh';
    iframe.style.marginTop = '50px'; // Adjust for navigation bar height
    iframe.referrerpolicy = 'no-referrer';
    iframe.allow = 'fullscreen';
    iframe.src = url;
    document.body.appendChild(iframe);

    // Add the current URL to history log
    addToHistory(url);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.margin = '0 10px';
    button.style.padding = '10px';
    button.style.backgroundImage = 'url(https://64.media.tumblr.com/dafce2d653dd5bf33b8f750147c6e697/642b086ad140f9bb-2e/s400x600/62f3e294c7c3abf7bc871c8f2a9766a0955e9000.gif)';
    button.style.backgroundSize = 'cover';
    button.style.border = '4px solid black';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
    button.addEventListener('click', onClick);
    return button;
}

function addToHistory(url) {
    // Remove URLs after the current history index
    historyLog = historyLog.slice(0, historyIndex + 1);
    // Add the new URL to history
    historyLog.push(url);
    // Update the history index
    historyIndex = historyLog.length - 1;
}

function navigateHistory(step) {
    const newIndex = historyIndex + step;
    if (newIndex >= 0 && newIndex < historyLog.length) {
        historyIndex = newIndex;
        const url = historyLog[historyIndex];
        iframe.src = url;
    }
}

function openSite(url) {
    var win = window.open();
    win.document.body.style.margin = "0";
    win.document.body.style.height = "100vh";
    var iframe = win.document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.referrerpolicy = "no-referrer";
    iframe.allow = "fullscreen";
    iframe.src = url;
    win.document.body.appendChild(iframe);
}
