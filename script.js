const key = "9639faf63445cfff0595422d24ff4237";
const url = "https://gnews.io/api/v4/search?q=";
const placeholderImage = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";

window.addEventListener('load', () => fetchData('Web Developers'));
async function fetchData(query) {
    const req = await fetch(`${url}${query}&apikey=${key}`);
    const data = await req.json();
    console.log(data)
    Bind(data.articles);
}

function Bind(articles) {
    const card_container = document.getElementById("container");
    const card = document.getElementById("template");

    card_container.innerHTML = ' ';
    articles.forEach(article => {
        const clone = card.content.cloneNode(true);
        fillDataInCard(clone, article);
        card_container.appendChild(clone);
    });

}

function fillDataInCard(cardclone, article) {
    if (!article.image) return;
    const newtitle = cardclone.querySelector('#title');
    const newdesc = cardclone.querySelector('#dis');
    const image = cardclone.querySelector('#img');
    newtitle.innerHTML = article.title;
    newdesc.innerHTML = article.description;
    image.src = article.image ? article.image : placeholderImage;
    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

const but = document.getElementById('search-butn');
const inp = document.getElementById('search-box');

but.addEventListener("click", () => {
    const query = inp.value;
    if (!query) return;
    fetchData(query);
})