import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add "http://" if empty
        let urlToShorten = originalUrl;
        if (!/^(http|https):\/\//i.test(originalUrl)) {
            urlToShorten = 'http://' + originalUrl;
        }

        const response = await fetch('http://localhost:8080/shorten-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlToShorten }),
        });

        const data = await response.json();
        setShortenedUrl(data.url);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <h1>URL Shortener</h1>
                    <div className="spacer"></div>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Enter URL to shorten:
                            <input
                                type="text"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Shorten URL</button>
                    </form>
                    <div className="spacer"></div>
                    {shortenedUrl && (
                        <p>
                            Shortened URL:<br></br><br></br> <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
                        </p>
                    )}
                </div>
            </header>
            <footer className="App-footer">
                <i className="fas fa-code"></i>
                <a href="https://github.com/tecnologiaefinancas/urlshortener" target="_blank"><i className="fab fa-github"></i></a>
                <a href="https://www.linkedin.com/in/natalia-feitosa-cga-cfp/" target="_blank"><i className="fab fa-linkedin"></i></a>
                Created in React by Natalia Feitosa
            </footer>
        </div>
    );
}

export default App;
