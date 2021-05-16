const quotesContainer = document.querySelector("main");
const loadNewQuoteButton = document.querySelector("button");

const readQuotes = async () => {
  let res = await fetch("./quotes.json");

  if (!res.ok) {
    quotesContainer.innerHTML = `
      <h1>Uh oh.</h1>
      <strong>Something weird happened. Keep calm and try again 😇</strong>
    `;

    loadNewQuoteButton.style.display = "none";
    return;
  }

  res = await res.json();
  const { quote, episode } = res[Math.floor(Math.random() * res.length)];

  quotesContainer.innerHTML = `
    <h1>${quote}</h1>
    <em><strong>-- ${episode}</strong></em>
  `;
};

const registerSW = async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.error("SW registration failed!");
    }
  }
};

window.addEventListener("load", () => {
  readQuotes();
  registerSW();
});

loadNewQuoteButton.addEventListener("click", readQuotes);
