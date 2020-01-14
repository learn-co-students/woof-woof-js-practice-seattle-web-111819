document.addEventListener("DOMContentLoaded", function() {
    getDogs();
})

const getDogs = () => {
    fetch("http://localhost:3000/pups")
    .then (res => res.json())
    .then (data => getDog(data))

}

const getDog = (dogArray) => {
    dogArray.forEach(pup => {showDog(pup)
    })

}

const showDog = (pup) => {
let dogBarDiv = document.getElementById("dog-bar");
let dogSpan = document.createElement("span");
const dogInfo = document.getElementById("dog-info");

dogSpan.innerText = pup.name ;
 dogSpan.addEventListener("click", () => {
     dogInfo.innerText = ""
     displayDogCard(pup)   
 });


 dogBarDiv.appendChild(dogSpan)
}

const displayDogCard = (pup) => {
const dogInfo = document.getElementById("dog-info");
const img = document.createElement("img")
img.src = pup.image 
const h2 = document.createElement('h2')
h2.innerText = pup.name 
const button = document.createElement('button')
if (pup.isGoodDog){
    button.innerText = "Good Dog!"
}
else {
    button.innerText = "Bad Dog!"
}

button.addEventListener("click", ()=>{
    dogInfo.innerText = ""
    updatePupStatus(pup)
})

dogInfo.appendChild(img);
dogInfo.appendChild(h2);
dogInfo.appendChild(button)
}

const updatePupStatus = (pup) => {

    let pupStatus = pup.isGoodDog
    pupStatus = !pupStatus

    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: { 
            "content-Type": "application/json",
            "Accept": "application/json",
        },
    body: JSON.stringify({
        "isGoodDog": pupStatus
    })
    
 
  }).then(res => res.json())
  .then(res => displayDogCard(res))
}

