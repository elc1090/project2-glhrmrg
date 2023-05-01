const search_term = '';
const song_container = document.getElementById('songs');

const search = () => {
    const search_term = document.getElementById('search').value;
    const api_url = `https://itunes.apple.com/search?term=${search_term}&media=music`;
    fetch(api_url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const artists = data.results;
            song_container.innerHTML = '';
            return artists.map(result => {
                const article = document.createElement('article');
                const audio = document.createElement('audio');
                const audio_source = document.createElement('source');

                article.innerHTML = `
                <div class="music-info">
                    <img class="track-img" src="${result.artworkUrl100}">
                    <div class="artist-info">
                        <p class="artist-name" >${result.artistName}</p>
                        <h4 class="track-name">${result.trackName}</h4>
                    </div>
                </div>
            `;

                audio.controls = true;
                audio_source.src = result.previewUrl;

                audio.appendChild(audio_source);
                article.appendChild(audio);
                song_container.appendChild(article);

            });
        })
        .catch(function (err) {
            console.log(err);
        });
}

const search_button = document.getElementById('btn-search');
search_button.addEventListener('click', search);