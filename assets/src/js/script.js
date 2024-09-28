let page = 1; 
const urlBase = 'https://rickandmortyapi.com/api/character/';
const rickandmorty = document.getElementById('apiList');

// Função para chamar a API
async function chamarApi(url) {
    const api = await fetch(url);

    if (api.status === 200) {
        const arquivos = await api.json();
        const resultados = arquivos.results;

        // Adiciona novos personagens à lista existente
        resultados.forEach(characterData => {
            criarElemento(characterData);
        });
    } else {
        console.error('Erro ao chamar a API:', api.status);
    }
}

// Função para criar e adicionar o elemento do personagem
function criarElemento(characterData) {
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
        
        fetch(subUrl)
            .then(res => res.json())
            .then(locationData => {
                locationSpan.textContent = `Localização: ${locationData.name};`;
            });
    }

    // Último episódio visto
    const episodeUrls = characterData.episode; 
    if (episodeUrls.length > 0) {
        const lastEpisodeUrl = episodeUrls[episodeUrls.length - 1];
        const episodeId = lastEpisodeUrl.split('/').pop();
        const subUrlEp = `https://rickandmortyapi.com/api/episode/${episodeId}`;
        
        fetch(subUrlEp)
            .then(res => res.json())
            .then(episodeData => {
                episodeSpan.textContent = `Último episódio: ${episodeData.name};`;
            });
    }

    characterElement.appendChild(imageDiv);
    characterElement.appendChild(infoDiv);
    rickandmorty.appendChild(characterElement);
}

// Função para aplicar os filtros
function aplicarFiltros() {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
    const speciesFilter = document.getElementById('speciesFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const name = card.querySelector('.paragraph').textContent.toLowerCase();
        const species = card.dataset.species; // Presumindo que você tenha isso no card
        const gender = card.dataset.gender; // Presumindo que você tenha isso no card
        const status = card.querySelector('p').textContent.split(': ')[1];

        const nameMatch = name.includes(nameFilter);
        const speciesMatch = !speciesFilter || species === speciesFilter;
        const genderMatch = !genderFilter || gender === genderFilter;
        const statusMatch = !statusFilter || status === statusFilter;

        if (nameMatch && speciesMatch && genderMatch && statusMatch) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Chama a API ao iniciar
chamarApi(`${urlBase}?page=${page}`);

// Evento do botão "LOAD MORE"
const button = document.getElementById('button');
button.addEventListener('click', () => {
    page++;
    chamarApi(`${urlBase}?page=${page}`);
});

// Eventos dos filtros
document.querySelectorAll('.filters input, .filters select').forEach(input => {
    input.addEventListener('input', aplicarFiltros);
});
