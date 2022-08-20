const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')
const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const buttonAnt = document.querySelector('.btn-ant')
const buttonPro = document.querySelector('.btn-pro')
const pokemonHeight = document.querySelector('.height')
const pokemonWeight = document.querySelector('.weight')
const pokemonCategory = document.querySelector('.category')
const pokemonAbilities = document.querySelector('.abilities')

let searchPokemon = 1

const fetchPokemon = async pekemon => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pekemon}`
  )

  if (APIResponse.status === 200) {
    const data = await APIResponse.json()
    return data
  }
}

const renderPokemon = async pokemon => {
  pokemonNumber.innerHTML = ''
  pokemonName.innerHTML = 'Loading...'

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src =
      data['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ]
    pokemonHeight.innerHTML = `${data.height / 10} m`
    pokemonWeight.innerHTML = `${data.weight / 10} kg`
    pokemonCategory.innerHTML = data.types[0].type.name
    pokemonAbilities.innerHTML = data.abilities[0].ability.name

    input.value = ''
    searchPokemon = data.id
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found!'
    pokemonNumber.innerHTML = ''
    input.value = ''

    pokemonHeight.innerHTML = '-'
    pokemonWeight.innerHTML = '-'
    pokemonCategory.innerHTML = '-'
    pokemonAbilities.innerHTML = '-'
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  renderPokemon(input.value.toLowerCase())
})

buttonAnt.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonPro.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
