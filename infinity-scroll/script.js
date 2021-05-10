// Unspalsh googleapis
const countPictures = 10;
// API key is in the api.js, included to .gitignore file:


// Check if API key is exist

// try {
//   const api_key = apiKey;
// } catch (error) {
//   console.log('No API key. Error code: ' + error);
// }
//
//
// console.log('API key: ' + api_key);

// const apiKey = 'apiKey';
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countPictures}`;
// Get Photos From Unspalsh API

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Cannot fetch data');
  }
}

// On Load
getPhotos();
