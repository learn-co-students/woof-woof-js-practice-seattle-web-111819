// STEP 1
document.addEventListener("DOMContentLoaded", () => {
    console.log("%c PAGE LOADED", "color: green")

    // add fetch dogs function
    getDogs()
})

// STEP 2
const getDogs = () => {
    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    // .then(json => console.log(json))
    .then(json => getEachPup(json))
}

// STEP 3
const getEachPup = (pupArray) => {
    pupArray.forEach(pup => {
        spanPup(pup)
        // console.log(pup)
    })
}

// STEP 4
const spanPup = (pup) => {
    let dogBar = document.getElementById("dog-bar")
    let span = document.createElement("span")
    span.textContent = pup.name
    // give an id to each pup
    span.id = pup.id
    // span.id = `span${pup.id}`
    // if there's multiple items

    // STEP 5
    // add button to span
    span.addEventListener("click", () => {
        // STEP 8
        // add to show one dog at a time, otherwise, each dog image won't clear and stay on screen
        let dogInfo = document.getElementById("dog-info")
        dogInfo.textContent = ""
        showPup(pup)
    })

    dogBar.appendChild(span)
}

// STEP 6
const showPup = (pup) => {
    // select div for showing dog's image
    let dogInfo = document.getElementById("dog-info")
    let img = document.createElement("img")
    img.src = pup.image
    // console.log(pup)
    let h2 = document.createElement("h2")
    h2.textContent = pup.name

    // STEP 7
    let button = document.createElement("button")
    if (pup.isGoodDog) {
        button.textContent = "Good Dog!"
    } else {
        button.textContent = "Bad Dog!"
    }
    button.addEventListener("click", () => {
        dogInfo.textContent = ""
        // clears after when button is clicked to see a new dog
        // 2nd option: Use while loop with .removeChild()

        // If doing optimistically, add isGoodDog here first

        // STEP 10: PART 2 pessismistic rendering - call on PATCH function
        patchPup(pup)
    })

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
}

// STEP 9: PART 1 pessimistic rendering - add to API here first, then add to DOM
// update dog's isDogGood status
const patchPup = (pup) => {
    let dogStatus = pup.isGoodDog
    dogStatus = !dogStatus

    // use string interpolation and add dog's id
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: dogStatus
        })
    })
    // add patchPup to DOM button inside showPup function
    .then(resp => resp.json())
    .then(json => showPup(json))
}