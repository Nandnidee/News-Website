document.addEventListener('DOMContentLoaded', function () {
    const placeholderImage = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";
    const key = "9639faf63445cfff0595422d24ff4237";
    const url = "https://gnews.io/api/v4/search?q=";
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const searchTermElement = document.getElementById('search-term');
    const newsResults = document.getElementById('news-results');

    function fetchData(query) {
        fetch(`${url}${encodeURIComponent(query)}&lang=en&apikey=${key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.articles && Array.isArray(data.articles)) {
                    bindArticles(data.articles);
                } else {
                    throw new Error('Invalid data structure');
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error in Fetching Data: ' + error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    function bindArticles(articles) {
        const template = document.getElementById('search-temp');
        newsResults.innerHTML = '';

        if (articles.length === 0) {
            Swal.fire({
                title: 'No Results',
                text: 'No Articles Found',
                icon: 'info',
                confirmButtonText: 'OK'
            });
            return;
        }

        articles.forEach(article => {
            const clone = template.content.cloneNode(true);
            fillDataInCard(clone, article);
            newsResults.appendChild(clone);
        });
    }

    function fillDataInCard(clone, article) {
        const titleElement = clone.querySelector('.search-title');
        const imageElement = clone.querySelector('#search-img');

        titleElement.textContent = article.title;
        imageElement.src = article.image || placeholderImage;
        imageElement.alt = article.title;

        clone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
    }

    document.getElementById('search-butn').addEventListener('click', () => {
        const searchBox = document.getElementById('search-box');
        const searchTerm = searchBox.value.trim();
        if (searchTerm) {
            window.location.href = `search.html?query=${encodeURIComponent(searchTerm)}`;
        }
    });

    if (query) {
        searchTermElement.textContent = query;
        fetchData(query);
    }
});