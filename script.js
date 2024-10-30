const subtleColors = [
  { name: "Lavender Mist", color: "rgba(230, 224, 238, 0.8)" },
  { name: "Mint Green", color: "rgba(218, 240, 233, 0.8)" },
  { name: "Peach Blossom", color: "rgba(255, 235, 238, 0.8)" },
  { name: "Sky Blue", color: "rgba(219, 238, 248, 0.8)" },
  { name: "Creamy Ivory", color: "rgba(255, 253, 240, 0.8)" },
  { name: "Light Gray", color: "rgba(238, 238, 238, 0.8)" },
  { name: "Pale Beige", color: "rgba(245, 240, 235, 0.8)" },
  { name: "Soft Sand", color: "rgba(245, 240, 230, 0.8)" },
  { name: "Silver Gray", color: "rgba(220, 220, 220, 0.8)" },
  { name: "Pearl White", color: "rgba(255, 255, 245, 0.8)" },
  { name: "Lilac Haze", color: "rgba(235, 225, 240, 0.8)" },
  { name: "Seafoam Green", color: "rgba(220, 240, 238, 0.8)" },
  { name: "Apricot Glow", color: "rgba(255, 235, 225, 0.8)" },
  { name: "Cloud White", color: "rgba(255, 255, 255, 0.8)" },
  { name: "Mist Blue", color: "rgba(225, 235, 245, 0.8)" },
  { name: "Soft Pink", color: "rgba(255, 220, 230, 0.8)" },
  { name: "Pale Yellow", color: "rgba(255, 245, 220, 0.8)" },
  { name: "Lavender Blush", color: "rgba(255, 220, 240, 0.8)" },
  { name: "Baby Blue", color: "rgba(220, 230, 245, 0.8)" },
  { name: "Creamy Beige", color: "rgba(245, 240, 235, 0.8)" },
  { name: "Light Green", color: "rgba(225, 240, 230, 0.8)" },
  { name: "Pale Orange", color: "rgba(255, 235, 220, 0.8)" },
  { name: "Soft Purple", color: "rgba(230, 220, 240, 0.8)" },
  { name: "Ivory White", color: "rgba(255, 253, 245, 0.8)" },
  { name: "Light Yellow", color: "rgba(255, 245, 225, 0.8)" },
  { name: "Pale Blue", color: "rgba(220, 230, 240, 0.8)" },
  { name: "Soft Red", color: "rgba(255, 220, 225, 0.8)" },
  { name: "Creamy White", color: "rgba(255, 253, 245, 0.8)" },
  { name: "Light Pink", color: "rgba(255, 230, 235, 0.8)" },
  { name: "Blush Beige", color: "rgba(245, 228, 220, 0.8)" },
  { name: "Powder Blue", color: "rgba(220, 240, 250, 0.8)" },
  { name: "Light Sage", color: "rgba(235, 245, 225, 0.8)" },
  { name: "Rose Quartz", color: "rgba(250, 224, 230, 0.8)" },
  { name: "Almond Milk", color: "rgba(255, 248, 240, 0.8)" },
  { name: "Pale Peach", color: "rgba(255, 230, 210, 0.8)" },
  { name: "Dusty Lilac", color: "rgba(230, 220, 235, 0.8)" },
  { name: "Honeydew", color: "rgba(240, 255, 240, 0.8)" },
  { name: "Light Coral", color: "rgba(240, 200, 200, 0.8)" },
  { name: "Warm Ivory", color: "rgba(255, 245, 230, 0.8)" },
  { name: "Blush Rose", color: "rgba(250, 225, 225, 0.8)" },
  { name: "Pastel Blue", color: "rgba(225, 240, 255, 0.8)" },
  { name: "Soft Lavender", color: "rgba(235, 220, 245, 0.8)" },
  { name: "Sunlight Yellow", color: "rgba(255, 250, 210, 0.8)" },
  { name: "Creamy Peach", color: "rgba(255, 240, 230, 0.8)" },
  { name: "Tender Mint", color: "rgba(220, 255, 230, 0.8)" },
];


const API_KEY="0b984d4e021a42c8b3bd617fc2371a97";

const newsContainer = document.getElementById("news-container");
const langFilter=document.getElementById("languageFilter");
const inputbox=document.getElementById("input-box");
const selectSortBy=document.getElementById("sort-by");

const sort_by=selectSortBy.value;
const language = langFilter.value; 
const searchFilter = document.getElementById("search-filter");


// DEFAULT NEWS WHEN NOT SEARCHED ANYTHING
async function loadDefaultNews() {
  let language = langFilter.value; // Get the selected language
  let sort_by = selectSortBy.value; // Get the selected sort option
  if(language=="" || language==null) language="en";
  if(sort_by=="" || sort_by==null) sort_by="popularity";

  await fetch(`https://newsapi.org/v2/everything?q=language=${language}&sortBy=${sort_by}&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => loadNews(data));
}

// CATEGORY NEWS SELECTED AT NAV BAR
async function loadCategoryNews(category) {
  const sort_by = selectSortBy.value;
  const language = langFilter.value;

 await fetch(`https://newsapi.org/v2/everything?q=${category}&sortBy=${sort_by}&language=${language}&apiKey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => loadNews(data))
    .catch((error) => console.error("Error fetching category news:", error));
}

// SHOW NEWS
function showNews(data) {
  data.forEach(function (news) {
    
    if (
      news.author === null ||
      news.author === "" ||
      !news.urlToImage ||
      news.urlToImage === ""
    ){
      return;
    }
    
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const source = document.createElement("span");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const author = document.createElement("span");
    const published = document.createElement("p");

    source.classList.add("source");
    source.innerText = news.source.name;

    image.classList.add("image");
    image.src = news.urlToImage;
    image.alt = news.title;

    title.classList.add("title");
    title.innerText = news.title;

    
    author.className = "author published";
    const publishedDate = new Date(news.publishedAt);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    author.innerText = `${news.author} • ${publishedDate.toLocaleString(undefined, options)}`;

    published.classList.add("description");
    published.innerText = news.description;

    newCard.append(source, image, title, author, published);
    // newsContainer.innerHTML="";

    newsContainer.append(newCard);
  });
}


// LOAD NEWS
function loadNews(data) {
  newsContainer.innerHTML="";
  console.log("Loading News...", data);
  
    showNews(data.articles);
  
}

// DEFAULT NEWS
window.addEventListener("load", loadDefaultNews);


// INPUT AT SEARCH BAR
document.querySelector(".searchBar").addEventListener('submit',function func(event){
  event.preventDefault();
  const searchData = inputbox.value.trim().toLowerCase();
  const sort_by=selectSortBy.value;
  const language = langFilter.value; 
  const searchIn = searchFilter.value; 

    
    let query = searchData;
    if (searchIn !== 'all') {
        query = `${searchIn}:${searchData}`; // Search only in the specified field
    }
  
  fetch(`https://newsapi.org/v2/everything?q=${searchData}&sortBy=${sort_by}&language=${language}&apiKey=${API_KEY}`)
  .then((res) => res.json())
  .then(loadNews);

})


// NAV BAR CLICK
document.getElementById("business").addEventListener("click", (event) => {
  event.preventDefault();
  loadCategoryNews("business");
});

document.getElementById("entertainment").addEventListener("click", (event) => {
  event.preventDefault();
  loadCategoryNews("entertainment");
});

document.getElementById("sports").addEventListener("click", (event) => {
  event.preventDefault();
  loadCategoryNews("sports");
});

document.getElementById("technology").addEventListener("click", (event) => {
  event.preventDefault();
  loadCategoryNews("technology");
});

langFilter.addEventListener('change', loadDefaultNews);
selectSortBy.addEventListener('change', loadDefaultNews);

function applyBackgroundColor() {
  const randomColor = subtleColors[Math.floor(Math.random() * subtleColors.length)].color;
  document.body.style.backgroundColor = randomColor;
}
window.onload = applyBackgroundColor;