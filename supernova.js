const form = document.querySelector('form');
const input = document.querySelector('input');
const blacklist = ['tiktok.com']; // Array of blacklisted domains
let iframe;

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
    navBar.style.alignItems = 'center';
    navBar.style.position = 'fixed';
    navBar.style.top = '0';
    navBar.style.width = '100%';
    navBar.style.backgroundColor = '#000000';
    navBar.style.padding = '10px';
    navBar.style.zIndex = '1000';

    // Create center text
    const centerText = document.createElement('div');
    centerText.textContent = 'S̸͔͌ͅṶ̷͂̚P̸̺̏Ḛ̶͊̋R̴̞͓̍̐N̴̟͊͌O̴͕͠V̵̠͘͝ͅA̶̧̅ UNBLOCKER';
    centerText.style.color = '#AB82FF'; // Light blueish-purple more on the purple side
    centerText.style.fontSize = '20px';
    centerText.style.textAlign = 'center';
    centerText.style.flexGrow = '1';

    // Create buttons
    const reloadButton = createButton('Reload', () => iframe.contentWindow.location.reload());
    const reloadButton = createButton('Restart (use if page not working)', () => window.location.replace('supernovafix.html));
    const homeButton = createButton('Home', () => window.location.reload());
    const launchButton = createButton('About:blank', () => openSite(iframe.src));

    // Append buttons and center text to nav bar
    navBar.append(reloadButton, centerText, homeButton, launchButton);
    document.body.appendChild(navBar);

    // Create iframe
    iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = 'calc(100vh - 50px)'; // Adjust for navigation bar height
    iframe.style.marginTop = '50px'; // Adjust for navigation bar height
    iframe.referrerpolicy = 'no-referrer';
    iframe.allow = 'fullscreen';
    iframe.src = url;
    document.body.appendChild(iframe);
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.margin = '0 10px';
    button.style.padding = '10px';
    button.style.background = 'linear-gradient(to right, #ADD8E6, #AB82FF)'; // Gradient background
    button.style.border = '4px solid black';
    button.style.color = 'black';
    button.style.textShadow = '1px 1px 2px white';
    button.style.cursor = 'pointer';
    button.style.transition = 'all 0.3s ease';
    button.style.outline = '2px solid white';
    button.style.outlineOffset = '-2px';
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
    button.addEventListener('click', onClick);
    return button;
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
