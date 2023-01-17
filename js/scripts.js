const headerStar = document.querySelector('.header')
const logo = document.querySelector('.logo')
const cards = document.querySelectorAll('.swiper-slide')
const swapi = new URL('https://swapi.dev/api/')

var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    freeMode: true,
    followFinger: true,
    spaceBetween: 20,
    mousewheel: {
        releaseOnEdges: true,
      },
});

const getinfo = async(id) => {
    const apiResponse = await fetch(swapi + id)
    const data = apiResponse.json();
    return data
}

cards.forEach(async card => {
        const id = card.getAttribute('id');
        const data = await getinfo('people/' + id);
        const name = card.querySelector('h2')
        const birth = card.querySelector('p.birth');
        const gender = card.querySelector('p.gender');
        const species = card.querySelector('p.species');
        const species_id = String(data.species).split('/')[5];
        const home_id = String(data.homeworld).split('/')[5];
        const height = card.querySelector('p.height');
        const mass = card.querySelector('p.mass');
        const hair = card.querySelector('p.hair');
        const skin = card.querySelector('p.skin');
        const home = card.querySelector('p.home');
        name.innerHTML = data.name;
        birth.innerHTML = '<strong>Birth Year: </strong> ' + data.birth_year
        gender.innerHTML = '<strong>Gender: </strong> ' + data.gender
        height.innerHTML = '<strong>Height: </strong> ' + data.height + ' cm'
        mass.innerHTML = '<strong>Mass: </strong> ' + data.mass + ' Kg'
        hair.innerHTML = '<strong>Hair: </strong> ' + data.hair_color
        skin.innerHTML = '<strong>Skin: </strong> ' + data.skin_color
        if (species_id != undefined) {
            const dataSpecies = await getinfo('species/' + species_id)
            console.log(dataSpecies)
            species.innerHTML = '<strong>Species: </strong> ' + dataSpecies.name
        } else {
            species.innerHTML = '<strong>Species: </strong> Undefined'
        }
        if (home_id != undefined) {
            const dataHome = await getinfo('planets/' + home_id)
            console.log(dataHome)
            home.innerHTML = '<strong>Home: </strong> ' + dataHome.name
        } else {
            home.innerHTML = '<strong>Home: </strong> Undefined'
        }
        
});

window.onload = function() {
    logo.classList.add('logoLoaded');
    setTimeout(() => {
        headerStar.classList.add('loaded');
    }, 3000)
}
