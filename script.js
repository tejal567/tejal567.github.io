document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 'about';

    if (page === 'about') {
        document.getElementById('page-title').innerText = 'About';
        document.getElementById('header-title').innerText = 'About';
        document.getElementById('main-content').innerHTML = `
            <p>Hello! I'm Tejal, a passionate machine learning engineer dedicated to leveraging AI to solve real-world challenges. With a strong foundation in computer science and a keen interest in innovative technologies, I have been fortunate to work on diverse projects that push the boundaries of what's possible. My journey has taken me through various roles, each contributing to my growth as a professional and a problem solver.</p>
        `;
        document.getElementById('about-link').classList.add('disabled');
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