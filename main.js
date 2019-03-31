let paragraph = document.querySelector('h1');

window.addEventListener('load', () => {
    fetchQuotes();
    registerSW();
})

async function fetchQuotes() {
    const res = await fetch('http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote');
    const json = await res.json();

    paragraph.innerHTML = json.starWarsQuote;
}

async function registerSW() {
    if('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        }
        catch(e) {
            console.log('SW registration failed!');
        }
    }
}