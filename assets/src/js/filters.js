async function aplicarFiltros() {
    const nameFilter = document.getElementById('nameFilter').value.trim();
    const speciesFilter = document.getElementById('speciesFilter').value;
    const genderFilter = document.getElementById('genderFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    let filters = [];

    if (nameFilter) {
        filters.push(`name=${encodeURIComponent(nameFilter)}`);
    }
    if (speciesFilter) {
        filters.push(`species=${encodeURIComponent(speciesFilter)}`);
    }
    if (genderFilter) {
        filters.push(`gender=${encodeURIComponent(genderFilter)}`);
    }
    if (statusFilter) {
        filters.push(`status=${encodeURIComponent(statusFilter)}`);
    }

    const filterString = filters.length ? `&${filters.join('&')}` : '';
    const url = `${urlBase}?page=1${filterString}`; // Chama a primeira página com os filtros

    // Chama a função que carrega os personagens com os filtros aplicados
    chamarApi(url);
}

// Adicionar eventos de input para todos os filtros
document.getElementById('nameFilter').addEventListener('input', aplicarFiltros);
document.getElementById('speciesFilter').addEventListener('change', aplicarFiltros);
document.getElementById('genderFilter').addEventListener('change', aplicarFiltros);
document.getElementById('statusFilter').addEventListener('change', aplicarFiltros);
