document.addEventListener("DOMContentLoaded", function() {
  getPups()
});

const getPups = () => {
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(json => showDogs(json))
}

const showDogs = (dogsArray) => {
  dogsArray.forEach(dog => addPup(dog))
}

const addPup = dog => {
  let span = document.createElement('span')
  span.innerText = dog.name
  span.addEventListener("click", e => {
    e.preventDefault()
    dogInfo(dog, e)
  })

  let dogBar = document.getElementById('dog-bar')
  dogBar.appendChild(span)
}

const dogInfo = (dog, e) => {
  let img = document.createElement('img')
  img.src = dog.image

  let h2 = document.createElement('h2')
  h2.innerText = dog.name

  let button = document.createElement('button')
  // button.innterText = ( dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!')
    console.log(dog)
    if (dog.isGoodDog) {
      button.innerText = "Good Dog!"
     } else {
      button.innerText = "Bad Dog!"
     }
  button.addEventListener("click", e => {
    e.preventDefault()
    toggleDog(dog, e)
  })

  let summary = document.getElementById('dog-summary-container')

  summary.appendChild(img)
  summary.appendChild(h2)
  summary.appendChild(button)
} 


const toggleDog = (dog, e) => {
  let dogStatus = dog.isGoodDog
  dogStatus = !dogStatus
  // console.log(dog.isGoodDog)

  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "Application/json",
      "Accept": "Application/json"
    },
    body: JSON.stringify ({
      isGoodDog: dogStatus
    })
  })
  .then(res => res.json())
  .then(json => dogInfo(dog))
} 

//update database
//patch

const updateDog = dog => {

}