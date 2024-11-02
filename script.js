const subtleColors = [
  { name: "Lavender Mist", color: "rgba(230, 224, 238, 0.8)" },
  // ... other colors
  { name: "Warm Ivory", color: "rgba(255, 245, 230, 0.8)" }
];

const API_KEY = "6cb8bb29e0a142e0099d39f200ea378a";
const newsContainer = document.getElementById("news-container");
const langFilter = document.getElementById("languageFilter");
const countryFilter = document.getElementById("countryFilter"); 
const inputbox = document.getElementById("input-box");
// const selectSortBy = document.getElementById("sort-by");
const searchFilter = document.getElementById("search-filter");

const loadNews = (data) => {
  newsContainer.innerHTML = "";
  console.log("Loading News...", data);
  showNews(data.articles);
};

// DEFAULT NEWS WHEN NOT SEARCHED ANYTHING
async function loadDefaultNews() {
  let language = langFilter.value || "en";
  let country = countryFilter.value || "in"; // Get the selected country
  // let sort_by = selectSortBy.value || "popularity";
  
  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?lang=${language}&country=${country}&apikey=${API_KEY}`);
    const data = await response.json();
    loadNews(data);
  } catch (error) {
    console.error("Error fetching default news:", error);
  }
}

// CATEGORY NEWS SELECTED AT NAV BAR
async function loadCategoryNews(category) {
  const language = langFilter.value || "en";
  const country = countryFilter.value || "in";
  // const sort_by = selectSortBy.value;
  
  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&apikey=${API_KEY}`);
    const data = await response.json();
    loadNews(data);
  } catch (error) {
    console.error("Error fetching category news:", error);
  }
}

// SHOW NEWS
function showNews(data) {
  data.forEach((news) => {
    if (!news.image || !news.source.name || !news.title) return;

    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const source = document.createElement("span");
    const image = document.createElement("img");
    const title = document.createElement("h2");
    const published = document.createElement("span");
    const description = document.createElement("p");

    source.classList.add("source");
    source.innerText = news.source.name;

    image.classList.add("image");
    image.src = news.image;
    image.alt = news.title;

    title.classList.add("title");
    title.innerText = news.title;

    published.className = "published";
    const publishedDate = new Date(news.publishedAt);
    published.innerText =`${publishedDate.toLocaleString()}`;

    description.classList.add("description");
    description.innerText = news.description || "No description available.";

    newCard.append(source, image, title, published,description);
    newsContainer.append(newCard);
  });
}

// INPUT AT SEARCH BAR
document.querySelector(".searchBar").addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchData = inputbox.value.trim().toLowerCase();
  const language = langFilter.value || "en";
  const country = countryFilter.value || "in";
  // const sort_by = selectSortBy.value;
 // const searchIn = searchFilter.value;

  try {
    const response = await fetch(`https://gnews.io/api/v4/search?q=${searchData}&lang=${language}&country=${country}&apikey=${API_KEY}`);
    const data = await response.json();
    loadNews(data);
  } catch (error) {
    console.error("Error searching news:", error);
  }
});

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

// FILTER CHANGES
langFilter.addEventListener("change", loadDefaultNews);
countryFilter.addEventListener("change", loadDefaultNews); 
// selectSortBy.addEventListener("change", loadDefaultNews);

// RANDOM BACKGROUND COLOR
function applyBackgroundColor() {
  const randomColor = subtleColors[Math.floor(Math.random() * subtleColors.length)].color;
  document.body.style.backgroundColor = randomColor;
}
window.onload = () => {
  applyBackgroundColor();
  loadDefaultNews();
};
