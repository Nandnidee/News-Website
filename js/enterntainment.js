document.addEventListener('DOMContentLoaded', function () {
    const key = "9639faf63445cfff0595422d24ff4237";
    const url = "https://gnews.io/api/v4/search?q=";
    const placeholderImage = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";

    fetchData('fashion');

    async function fetchData(query) {
        const req = await fetch(`${url}${query}&apikey=${key}`);
        const data = await req.json();
        console.log(data);
        Bind(data.articles);
        bindSlideshow(data.articles.slice(0, 3));
    }

    function Bind(articles) {
        const card_container = document.getElementById("enter-news");
        const card = document.getElementById("news-template");

        card_container.innerHTML = '';


        const limitedArticles = articles.slice(2, 12);

        limitedArticles.forEach(article => {
            const clone = card.content.cloneNode(true);
            fillDataInCard(clone, article);
            card_container.appendChild(clone);
        });
    }
    function bindSlideshow(articles) {
        const slideshowContainer = document.querySelector('.slideshow-container');
        const slideTemplate = document.getElementById('image');
        slideshowContainer.innerHTML = '';

        articles.forEach((article, index) => {
            const slideClone = slideTemplate.content.cloneNode(true);
            const slideImg = slideClone.querySelector('#slide');
            const slideText = slideClone.querySelector('.text');
            slideImg.src = article.image || placeholderImage;
            slideText.textContent = article.title;
            slideClone.querySelector('.mySlides').classList.add('fade');
            slideshowContainer.appendChild(slideClone);
        });

        showSlides();
    }
    function fillDataInCard(cardclone, article) {
        const newtitle = cardclone.querySelector('.news-title');
        const image = cardclone.querySelector('#news-img');

        newtitle.textContent = article.title;
        image.src = article.image || placeholderImage;

        cardclone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
    }
    let slideIndex = 0;
    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].style.display = "block";
            slides[slideIndex - 1].classList.add('fade');
            dots[slideIndex - 1].className += " active";
        }
        setTimeout(showSlides, 2000);
    }

});
