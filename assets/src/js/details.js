let characters = []; // Variável global para armazenar personagens
let page = 1; 
const urlBase = 'https://rickandmortyapi.com/api/character/';
const rickandmorty = document.getElementById('apiList');

async function chamarApi(url) {
    const api = await fetch(url);

    if (api.status === 200) {
        const arquivos = await api.json();
        const resultados = arquivos.results;

        characters = resultados; // Armazena personagens para filtro

        rickandmorty.innerHTML = ''; // Limpa a lista anterior

        for (const characterData of resultados) {
            const characterElement = document.createElement('div');
            characterElement.classList.add('card');

            // Adicionando evento de clique para redirecionar
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

            infoDiv.appendChild(infoSection);
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
