
const verseBox = document.getElementById('verse_box');
const verseText = document.getElementById('verse');
const passageText = document.getElementById('passage');
const twitter = document.getElementById('twitter');
const newerVerse = document.getElementById('new-verse');
const loader = document.getElementById('loader');

// Global variable 
let apiVerses = [];

// Show the loading animation
function loading(params) {
   loader.hidden = false;
   verseBox.hidden = true;
}

// Hide the loading animation
function complete(params) {
   verseBox.hidden = false;
   loader.hidden = true;
}

// Display New Verse
function newVerse(params) {
      loading();
        // Pick a random verse
        const verse = apiVerses[Math.floor(Math.random() * apiVerses.length)];
        verseText.textContent = verse.text;

      //   check if passage verse is empty 
      if (!verse.verse) {
         passageText.textContent = 'Unknown';
      } else {
         passageText.textContent = verse.verse;
      }

      if (verse.text.length > 120)
      {
         verseText.classList.add('long_verse');
      } else {
         verseText.classList.remove('long_verse');
      }
      // Set verse and hide loader
      complete();
}

// Get Verses from API
async function getVerses(params) {
      loading();
     const apiUrl = 'https://type.fit/api/verses';
     try {
        const response = await fetch(apiUrl);
        apiVerses = await response.json();  
        newVerse();
     } catch (error) {
        alert("error");
     }
}

// Get twitter button to work
function tweetVerse(params) {
   const twitterUrl = `https://facebook.com/plugins/page.php?text=${verseText.textContent} - ${passageText.textContent}`;
   window.open(twitterUrl, '_blank');
}

// Event Listeners
newerVerse.addEventListener('click', newVerse);
twitter.addEventListener('click', tweetVerse);

// Load
getVerses();
