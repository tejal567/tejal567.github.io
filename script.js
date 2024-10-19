document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'about';

    if (page === 'about') {
        document.getElementById('page-title').innerText = 'About';
        document.getElementById('header-title').innerText = 'About';
        document.getElementById('main-content').innerHTML = `
            <p>Hi! I am a designer and developer residing in Berlin...</p>
            <p>Ever since my high school years, I've devoted considerable time...</p>
            <p>For more information about my professional journey...</p>
        `;
        document.getElementById('about-link').classList.add('disabled');
    } else if (page === 'art') {
        document.getElementById('page-title').innerText = 'Art';
        document.getElementById('header-title').innerText = 'Art';
        document.getElementById('main-content').innerHTML = `
            <p>Welcome to my Art page! Here, I document my thoughts...</p>
        `;
        document.getElementById('art-link').classList.add('disabled');
    } else if (page === 'quotes') {
        document.getElementById('page-title').innerText = 'Quotes';
        document.getElementById('header-title').innerText = 'Quotes';
        fetch('quotes.txt')
            .then(response => response.text())
            .then(data => {
                const quotes = data.split('\n').filter(quote => quote.trim() !== '');
                const quotesHtml = quotes.map(quote => `<blockquote>${quote}</blockquote>`).join('');
                document.getElementById('main-content').innerHTML = quotesHtml;
            })
            .catch(error => {
                document.getElementById('main-content').innerHTML = `<p>Error loading quotes.</p>`;
            });
        document.getElementById('quotes-link').classList.add('disabled');
    }
});