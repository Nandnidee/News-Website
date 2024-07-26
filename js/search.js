document.addEventListener('DOMContentLoaded', function () {
    const apiKey = "0fc2e6c3ab9b4bac94c0ce7230604d1f";
    const placeholderImage = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=b9S9F5NT9TWeFZE8XGGdIu3FucUa2Nm9MAXIgkj-FnA=";
    const url = "https://newsapi.org/v2/everything?q=";
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const searchTermElement = document.getElementById('search-term');
    const newsResults = document.getElementById('news-results');

    function fetchData(query) {
        fetch(`${url}${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=12`)
            .then(response => response.json())
            .then(data => bindArticles(data.articles))
            .catch(error => {
                console.error("Error fetching data:", error);
                Swal.fire({
                    title: 'Error',
                    text: 'Error in Fetching Data.',
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
                title: 'Error',
                text: 'No Articles Found',
                icon: 'error',
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
        imageElement.src = article.urlToImage || placeholderImage;

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
