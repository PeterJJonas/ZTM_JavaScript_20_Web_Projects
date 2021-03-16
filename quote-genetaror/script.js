const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const language = document.getElementById('language')
let lang = 'en';
let tryToFetchApi = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuoteFromApi() {
  showLoadingSpinner();
  const proxyUrl = 'https://powerful-headland-36816.herokuapp.com/'
  const apiUrl = `http://api.forismatic.com/api/1.0/?method=getQuote&lang=${lang}&format=json`;
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If author is blank add 'Unknown'
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stopp Loader, Show Quote
    removeLoadingSpinner();
    // throw new Error('hellahellahella!');
  } catch (error) {
    // remove recursive function
    tryToFetchApi++;
    if (tryToFetchApi > 10) {
      removeLoadingSpinner();
      quoteText.innerText = 'Cannot connect to the server. Try it later.';
      authorText.innerText = 'Buddha';
      tryToFetchApi = 0;
    } else {
      getQuoteFromApi();
    }
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

function changeLanguage() {
  if (lang === 'en') {
    lang = 'ru';
    language.innerText = 'RU';
  } else {
    lang = 'en';
    language.innerText = "EN";
  }
  console.log(lang);
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);
language.addEventListener('click', changeLanguage);

// On Load
getQuoteFromApi();
