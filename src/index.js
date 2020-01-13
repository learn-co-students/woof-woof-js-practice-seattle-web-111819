document.addEventListener("DOMContentLoaded", function () {
    getDogs() 
})

const getDogs = () => {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    //.then(console.log)
    .then(json => getEachPup(json))
}

const getEachPup = (pupArray) => {
    pupArray.forEach(pup => {
      spanPup(pup)  
    })
}

const spanPup = (pup) => {
    const dogBar = document.querySelector("#dog-bar")
    let span = document.createElement("span") 
    span.innerText = pup.name
    //span.id = pup.id // `span${pup.id}` - set this id so you can reference it later 

    span.addEventListener("click", function () {
        const dogInfo = document.getElementById("dog-info")
        dogInfo.innerHTML = " "
        showPup(pup) 
    })
    dogBar.appendChild(span) 
}

const showPup = (pup) => {
    const dogInfo = document.getElementById("dog-info") // check this in console 
    let img = document.createElement("img")
    img.src = pup.image 
    let h2 = document.createElement("h2")
    h2.innerText = pup.name
    let button = document.createElement("button")
    if(pup.isGoodDog) {
        button.innerText = "Good dog!"
    } else {
        button.innerText = "Bad dog!"
    }
    button.addEventListener("click", function () {
        dogInfo.innerHTML = " "
        patchPup(pup) 
    })

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button) 
    
}

const patchPup = (pup) => {
    let dogStatus = pup.isGoodDog
    dogStatus = !dogStatus // could also do if statement 

    fetch(`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
            "isGoodDog": dogStatus
        })    
    }).then(res => res.json())
    .then(json => showPup(json))
}


// old code 

// document.addEventListener("DOMContentLoaded", function() {
//     getPups()
//   });

// // get all the dogs from the server
//   const getPups = () => {
//     fetch("http://localhost:3000/pups")
//     .then(res => res.json())
//     .then(json => showDogs(json))
//   }

// // shows all the dogs   
//   const showDogs = (dogsArray) => {
//     dogsArray.forEach(dog => addPup(dog))
//   }

//   const addPup = dog => {
//     let span = document.createElement('span')
//     span.innerText = dog.name
//     span.addEventListener("click", e => {
//       e.preventDefault()
//       dogInfo(dog, e)
//     }) 
//     let dogBar = document.getElementById('dog-bar')
//   dogBar.appendChild(span)
// }

// const dogInfo = (dog, e) => {
//     let img = document.createElement('img')
//     img.src = dog.image
  
//     let h2 = document.createElement('h2')
//     h2.innerText = dog.name
  
//     let button = document.createElement('button')
//       //console.log(dog)
//       if (dog.isGoodDog) {
//         button.innerText = "Good Dog!"
//        } else {
//         button.innerText = "Bad Dog!"
//        }
//     button.addEventListener("click", e => {
//       e.preventDefault()
//       toggleDog(dog, e)
//     })

// let summary = document.getElementById('dog-summary-container')

//   summary.appendChild(img)
//   summary.appendChild(h2)
//   summary.appendChild(button)
// } 

