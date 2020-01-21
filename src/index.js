document.addEventListener("DOMContentLoaded", ()=> {
    getDogs();
})

const getDogs = () => {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => getDog(data))
}

const getDog = (dogArray) => {
    dogArray.forEach(pup => {displayPup(pup)})
}

const displayPup = (pup) => {
    
    let div = document.getElementById("dog-bar")
    let span = document.createElement("span")
    span.innerText = pup.name 
    span.addEventListener("click", () => {
        let dogDiv = document.getElementById("dog-info")
        dogDiv.innerText = ""
        showEachDog(pup)
    })
    div.appendChild(span)
}

const showEachDog = (pup) => {
    let div = document.getElementById("dog-info")
    let img = document.createElement("img")
    img.src = pup.image
    let name = document.createElement("h4")
    name.innerText = pup.name 

    let dogStatusButton = document.createElement("button")

        if(pup.isGoodDog){
            dogStatusButton.innerText = "good Dog ! "
        }else{
            dogStatusButton.innerText = "bad Dog !"
        }

    dogStatusButton.addEventListener("click", () => {
        pup.isGoodDog = !pup.isGoodDog
        if(pup.isGoodDog){
            dogStatusButton.innerText = "good Dog ! "
        }else{
            dogStatusButton.innerText = "bad Dog !"
        }


        updateStatus(pup)
    })

    div.appendChild(img)
    div.appendChild(name)
    div.appendChild(dogStatusButton)
}

const updateStatus = (pup) => {
fetch (`http://localhost:3000/pups/${pup.id}`, {
    method: "PATCH",
    headers: {
        "content-Type": "application/json",
        "Accept": "application/json",
    },
    body: JSON.stringify({
        "isGoodDog": pup.isGoodDog
    })

})
   
}









































































































// document.addEventListener("DOMContentLoaded", function() {
//     getDogs();
// })

// const getDogs = () => {
//     fetch("http://localhost:3000/pups")
//     .then (res => res.json())
//     .then (data => getDog(data))

// }

// const getDog = (dogArray) => {
//     dogArray.forEach(pup => {showDog(pup)
//     })

// }

// const showDog = (pup) => {
// let dogBarDiv = document.getElementById("dog-bar");
// let dogSpan = document.createElement("span");
// const dogInfo = document.getElementById("dog-info");

// dogSpan.innerText = pup.name ;
//  dogSpan.addEventListener("click", () => {
//      dogInfo.innerText = ""
//      displayDogCard(pup)   
//  });


//  dogBarDiv.appendChild(dogSpan)
// }

// const displayDogCard = (pup) => {
// const dogInfo = document.getElementById("dog-info");
// const img = document.createElement("img")
// img.src = pup.image 
// const h2 = document.createElement('h2')
// h2.innerText = pup.name 
// const button = document.createElement('button')
// if (pup.isGoodDog){
//     button.innerText = "Good Dog!"
// }
// else {
//     button.innerText = "Bad Dog!"
// }

// button.addEventListener("click", ()=>{
//     dogInfo.innerText = ""
//     updatePupStatus(pup)
// })

// dogInfo.appendChild(img);
// dogInfo.appendChild(h2);
// dogInfo.appendChild(button)
// }

// const updatePupStatus = (pup) => {

//     let pupStatus = pup.isGoodDog
//     pupStatus = !pupStatus
    
//     fetch(`http://localhost:3000/pups/${pup.id}`, {
//         method: "PATCH",
//         headers: { 
//             "content-Type": "application/json",
//             "Accept": "application/json",
//         },
//     body: JSON.stringify({
//         "isGoodDog": pupStatus
//     })
    
 
//   }).then(res => res.json())
//   .then(res => displayDogCard(res))
// }

