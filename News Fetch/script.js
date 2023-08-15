const Api_Key = "d2ce89b719ea4f4c8ed58d095189db72";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=> fetchNews("India"));
function reload (){
    window.location.reload();
}
async function fetchNews (query){
    const response = await fetch(`${url}${query}&apiKey=${Api_Key}`);
const data = await response.json();
console.log(data);
bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate =document.getElementById("template-news-cards");
    cardsContainer.innerHTML = "";

    articles.forEach(article =>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });

}
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource= cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone : "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}
let curSelectedNav = null;   // cur = current.
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});