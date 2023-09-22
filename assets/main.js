

const offset = 0
const limit = 10
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

function convertPokemonToHtml(pokemon) {
    return (
        `<li class="pokemon"> 
            <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type">${type.type.name}</li>`).join('')}
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </div>
        </li>`
    );
}
fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemonList) => {
        for (let i = 0; i < pokemonList.length; i++) {
            const pokemonUrl = pokemonList[i].url;
            fetch(pokemonUrl)
                .then((response) => response.json())
                .then((pokemonData) => {
                    console.log(convertPokemonToHtml(pokemonData));
                })
                .catch((error) => console.error(error));
        }
    })
    .catch((error) => console.error(error));
