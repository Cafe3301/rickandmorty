let page = 1; 
const urlBase = 'https://rickandmortyapi.com/api/character/';
const rickandmorty = document.getElementById('apiList');
const button = document.getElementById('button'); // Certifique-se de que o botão está definido

async function chamarApi(url) {
    const api = await fetch(url);

    if (api.status === 200) {
        const arquivos = await api.json();
        const resultados = arquivos.results;

        // Não limpe a lista, apenas adicione novos personagens
        for (const characterData of resultados) {
            const characterElement = document.createElement('div');
            characterElement.classList.add('card');

            characterElement.addEventListener('click', () => {
                window.location.href = `details.html?id=${characterData.id}`;
            });

            const imageDiv = document.createElement('div');
            const imageUrl = `https://rickandmortyapi.com/api/character/avatar/${characterData.id}.jpeg`;
            const image = document.createElement('img');
            image.src = imageUrl;
            image.alt = characterData.name;
            imageDiv.appendChild(image);

            const infoDiv = document.createElement('div');
            const infoSection = document.createElement('section');
            const nameParagraph = document.createElement('p');
            nameParagraph.classList.add('paragraph');
            nameParagraph.textContent = characterData.name;

            const statusParagraph = document.createElement('p');
            statusParagraph.classList.add(characterData.status === 'Alive' ? 'status-alive' : characterData.status === 'Dead' ? 'status-dead' : 'status-unknown');
            statusParagraph.textContent = `Status: ${characterData.status};`;

            infoSection.appendChild(nameParagraph);
            infoSection.appendChild(statusParagraph);

            const locationSection = document.createElement('section');
            const locationSpan = document.createElement('span');
            locationSpan.classList.add("last-location");
            locationSpan.textContent = `Localização: N/A;`;
            locationSection.appendChild(locationSpan);

            const episodeSection = document.createElement('section');
            const episodeSpan = document.createElement('span');
            episodeSpan.classList.add('last-ep');
            episodeSpan.textContent = `Último episódio: N/A;`;
            episodeSection.appendChild(episodeSpan);

            infoDiv.appendChild(infoSection);
            infoDiv.appendChild(locationSection);
            infoDiv.appendChild(episodeSection);

            // Obtenha a localização do personagem
            const locationUrl = characterData.location.url;
            if (locationUrl) {
                const locationId = locationUrl.split('/').pop();
                const subUrl = `https://rickandmortyapi.com/api/location/${locationId}`;
                
                const subApi = await fetch(subUrl);
                if (subApi.status === 200) {
                    const locationData = await subApi.json();
                    locationSpan.textContent = `Localização: ${locationData.name};`;
                }
            }

            // Último episódio visto
            const episodeUrls = characterData.episode;
            if (episodeUrls.length > 0) {
                const lastEpisodeUrl = episodeUrls[episodeUrls.length - 1];
                const episodeId = lastEpisodeUrl.split('/').pop();
                const subUrlEp = `https://rickandmortyapi.com/api/episode/${episodeId}`;
                
                const subApiEp = await fetch(subUrlEp);
                if (subApiEp.status === 200) {
                    const episodeData = await subApiEp.json();
                    episodeSpan.textContent = `Último episódio: ${episodeData.name};`;
                }
            }

            characterElement.appendChild(imageDiv);
            characterElement.appendChild(infoDiv);
            rickandmorty.appendChild(characterElement);
        }
    } else {
        console.error('Erro ao chamar a API:', api.status);
    }
}

// Chama a API ao iniciar
chamarApi(`${urlBase}?page=${page}`);

// Adiciona evento de clique para o botão
button.addEventListener('click', () => {
    page++; // Incrementa a página
    chamarApi(`${urlBase}?page=${page}`); // Chama a API com a nova página
});
