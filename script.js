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
