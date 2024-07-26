// // const key = "9639faf63445cfff0595422d24ff4237";
// const key = "0fc2e6c3ab9b4bac94c0ce7230604d1f";
// // const url = "https://newsapi.org/v2/everything?q=";

document.addEventListener('DOMContentLoaded', function () {
    const mainPlayer = document.getElementById('main-player');
    const mainVideoTitle = document.getElementById('main-video-title');
    const playlistItems = document.querySelectorAll('.playlist-item');

    function setActiveVideo(videoId, title) {
        mainPlayer.src = `https://www.youtube-nocookie.com/embed/${videoId}?si=PjoW0xM1WP2h2ZjB`;
        mainVideoTitle.textContent = title;
        playlistItems.forEach(item => {
            if (item.getAttribute('data-video-id') === videoId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    playlistItems.forEach(item => {
        item.addEventListener('click', function () {
            const videoId = this.getAttribute('data-video-id');
            const title = this.querySelector('h3').textContent;
            setActiveVideo(videoId, title);
        });
    });

    const firstVideoId = playlistItems[0].getAttribute('data-video-id');
    const firstVideoTitle = playlistItems[0].querySelector('h3').textContent;
    setActiveVideo(firstVideoId, firstVideoTitle);

    const key = "0fc2e6c3ab9b4bac94c0ce7230604d1f";
    const url = "https://newsapi.org/v2/everything?q=";
    const placeholderImage = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";
    fetchData('Web Developers');
    function fetchData(query) {
        fetch(`${url}${query}&apikey=${key}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Bind(data.articles);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function Bind(articles) {
        const card_container = document.getElementById("latest-news");
        const card = document.getElementById("template");

        card_container.innerHTML = '';

        const limitedArticles = articles.slice(0, 10);

        limitedArticles.forEach(article => {
            const clone = card.content.cloneNode(true);
            fillDataInCard(clone, article);
            card_container.appendChild(clone);
        });
    }

    function fillDataInCard(cardclone, article) {
        const newtitle = cardclone.querySelector('.line');
        const newdesc = cardclone.querySelector('.dis');
        const image = cardclone.querySelector('#img');

        newtitle.innerHTML = article.title;
        newdesc.innerHTML = article.description;
        image.src = article.urlToImage || placeholderImage;

        cardclone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
    }

});
