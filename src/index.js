// Load Chain:
window.onload = () => {
    getAllDogs().then(d => d.forEach(dog => displayDog(dog)))
    document.getElementById('good-dog-filter').onclick = e => clickDogFilter(e)
}


// Fetches:
const getAllDogs = () => fetch("http://localhost:3000/pups").then(r => r.json())
const getDog = id => fetch(`http://localhost:3000/pups/${id}`).then(r => r.json())
const updateDog = dog => fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json", "Accept": "application/json"},
    body: JSON.stringify(dog)
    }).then(r => r.json())


// Events:
const clickDogBarName = id => getDog(id).then(d => displayDogInfo(d))
const clickGoodDog = dog => {
    dog.isGoodDog = !dog.isGoodDog
    updateDog(dog).then(d => {
        displayDogInfo(d)
        if (document.getElementById('good-dog-filter').innerText.split(': ')[1] == "ON") filterDogs()
    })
}
const clickDogFilter = e => {
    let val = e.target.innerText.split(': ')
    if (val[1] == "OFF") {
        e.target.innerText = val[0] + ": ON"
    } else {
        e.target.innerText = val[0] + ": OFF"
    }
    filterDogs() 
}


// Helpers:
const displayDog = dog => {
    let span = document.createElement('span')
    span.id = `bar-${dog.id}`
    span.textContent = dog.name
    span.onclick = () => clickDogBarName(dog.id)
    document.getElementById('dog-bar').appendChild(span)
}
const displayDogInfo = dog => {
    let div = document.createElement('div'),
        img = document.createElement('img'),
        h2 = document.createElement('h2'),
        button = document.createElement('button')
    img.src = dog.image
    h2.innerText = dog.name
    if (dog.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }
    button.id = dog.id
    button.onclick = () => clickGoodDog(dog)
    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(button)
    document.getElementById('dog-info').replaceWith(div)
    div.id = "dog-info"
}
const filterDogs = () => {
    let button = document.getElementById('good-dog-filter')
    document.querySelectorAll('#dog-bar span').forEach(span => span.style.display = "flex")
    if (button.innerText.split(': ')[1] == "ON") {
        getAllDogs().then(d => {
            d.forEach(dog => {if (!dog.isGoodDog) document.getElementById(`bar-${dog.id}`).style.display = "none"})
        })
    }
}