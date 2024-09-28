const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

async function fetchCharacterDetails() {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
    if (response.ok) {
        const character = await response.json();
        displayCharacterDetails(character);
        fetchEpisodes(character.episode); // Busca episódios relacionados
    } else {
        console.error('Erro ao buscar detalhes do personagem:', response.status);
    }
}

function displayCharacterDetails(character) {
    // Preenche as informações do personagem
    document.getElementById('characterImage').src = character.image;
    document.getElementById('characterName').textContent = character.name;

    document.getElementById('gender').textContent = `Gender: ${character.gender}`;
    document.getElementById('status').textContent = `Status: ${character.status}`;
    document.getElementById('species').textContent = `Species: ${character.species}`;
    document.getElementById('origin').textContent = `Origin: ${character.origin.name}`;
    document.getElementById('type').textContent = `Type: ${character.type || 'Unknown'}`;
    document.getElementById('location').textContent = `Location: ${character.location.name}`;
}

async function fetchEpisodes(episodeUrls) {
    // Limitar a 5 episódios
    const limitedEpisodeUrls = episodeUrls.slice(0, 5);
    
    const episodeList = document.getElementById('episodeList');
    episodeList.innerHTML = ''; // Limpa a lista atual

    for (const episodeUrl of limitedEpisodeUrls) {
        const response = await fetch(episodeUrl);
        if (response.ok) {
            const episode = await response.json();

            const episodeItem = document.createElement('li');
            episodeItem.innerHTML = `<strong>${episode.episode}</strong>: ${episode.name} (${episode.air_date})`;
            episodeList.appendChild(episodeItem);
        } else {
            console.error('Erro ao buscar detalhes do episódio:', response.status);
        }
    }
}

// Chama a função
fetchCharacterDetails();
