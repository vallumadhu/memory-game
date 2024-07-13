let container = document.getElementById("container")
let start = document.getElementById("start")
let bgm = new Audio("media\\bgm.mp3")
let dataSet = [
    {
        name: "bulbasaur",
        url: "media\\bulbasaur.png"
    },
    {
        name: "butterfree",
        url: "media\\butterfree.png"
    },
    {
        name: "charmender",
        url: "media\\charmender.png"
    },
    {
        name: "gengar",
        url: "media\\gengar.png"
    },
    {
        name: "meowth",
        url: "media\\meowth.png"
    },
    {
        name: "onix",
        url: "media\\onix.png"
    },
    {
        name: "psyduck",
        url: "media\\psyduck.png"
    },
    {
        name: "togepi",
        url: "media\\togepi.png"
    },
    {
        name: "bulbasaur",
        url: "media\\bulbasaur.png"
    },
    {
        name: "butterfree",
        url: "media\\butterfree.png"
    },
    {
        name: "charmender",
        url: "media\\charmender.png"
    },
    {
        name: "gengar",
        url: "media\\gengar.png"
    },
    {
        name: "meowth",
        url: "media\\meowth.png"
    },
    {
        name: "onix",
        url: "media\\onix.png"
    },
    {
        name: "psyduck",
        url: "media\\psyduck.png"
    },
    {
        name: "togepi",
        url: "media\\togepi.png"
    }
]

let cardsMatched = 0
let chosenCardid = []
let selected = []

let IsGameOn = false
let isFlipping = false // this is done to fix a bug I found while testing
function game() {
    for (let i = 0; i < dataSet.length; i++) {
        dataSet.sort(() => 0.5 - Math.random())
        // adding cards to HTML DOCUMENT 

        let card = document.createElement("div")
        card.setAttribute("id", `card${i}`)
        card.classList.add("card")
        let cardCover = document.createElement("img")
        cardCover.setAttribute("src", "media\\cover.png")
        cardCover.classList.add("cardCover")
        card.appendChild(cardCover)
        container.appendChild(card)
        card.setAttribute("data-id", dataSet[i].name)
        let cardChar = document.createElement("img")
        cardChar.setAttribute("src", dataSet[i].url)
        cardChar.classList.add("cardChar")
        card.appendChild(cardChar)

        cardChar.setAttribute('draggable', false);
        cardCover.setAttribute('draggable', false);
        card.setAttribute('draggable', false);
        container.setAttribute('draggable', false);

        // for flip effect
        card.addEventListener("click", () => {
            if (IsGameOn && !(isFlipping)) {
                card.classList.add("active")
            }
        })

        // it's kinda main function 
        card.addEventListener("click", () => {
            if (IsGameOn && !(isFlipping)) {
                if (selected.length < 2) {

                    selected.push(card.getAttribute("data-id"))
                    chosenCardid.push(card.getAttribute("id"))

                    if (selected.length == 2) {
                        if (selected[0] == selected[1]) {
                            if (chosenCardid[0] == chosenCardid[1]) { // if user taps on same card again
                                chosenCardid.pop()
                                selected.pop()

                            } else {  // when selected cards are a match

                                let charName = selected[0]
                                selected = []
                                chosenCardid = []
                                cardsMatched += 2
                                if (cardsMatched >= 16) {
                                    gameOver()
                                }
                                isFlipping = true
                                setTimeout(() => {
                                    for (let i = 0; i < 2; i++) {
                                        let char = document.querySelectorAll(`[data-id=${charName}]`)[i]
                                        let charCopy = char.cloneNode(true)
                                        char.replaceWith(charCopy)
                                    }
                                    selected = []   // this is done to fix a bug I found while testing
                                    chosenCardid = []  // this is done to fix a bug I found while testing
                                    isFlipping = false
                                }, 700)

                            }
                        } else {  // when selected cards are not a match 

                            let charName1 = chosenCardid[0]
                            let charName2 = chosenCardid[1]
                            selected = []
                            chosenCardid = []
                            isFlipping = true
                            setTimeout(() => {
                                isFlipping = false
                                document.getElementById(charName1).classList.remove("active")
                                document.getElementById(charName2).classList.remove("active")
                            }, 700)
                        }
                    }
                }
            }
        })
    }
}
game()

// making more interactive
let last = document.getElementById("last")
let best = document.getElementById("best")
let timerTime = document.getElementById("timerTime")
let time = 0
let myTimer
start.addEventListener("click", () => {
    bgm.play()
    if (start.innerHTML == "Play") {
        IsGameOn = true
        start.innerHTML = "Reset"
        clearInterval(myTimer)
         myTimer = setInterval(() => {
            if (IsGameOn == true) {
                time++
                timerTime.innerHTML = getTime(time)
            }
        }, 1000)
    }else{ // JavaScript for reset
        bgm.pause()
        start.innerHTML = "Play"
        container.innerHTML = ""
        cardsMatched = 0
        game()
        IsGameOn = false
        isFlipping = false
        timerTime.innerHTML = getTime(0)
        time = 0
        selected = []
        chosenCardid = []
        clearInterval(myTimer)
    }
})

function gameOver() {
    IsGameOn = false

    localStorage.setItem("last", time)
    last.innerHTML = getTime(time)
    if (localStorage.getItem("best") == null) {
        localStorage.setItem("best", time)
        best.innerHTML = getTime(time)
        setTimeout(myConfetti(), 1000)
        setTimeout(myConfetti(), 2000)
    } else {
        if (localStorage.getItem("best") > time) {
            localStorage.setItem("best", time)
            best.innerHTML = getTime(time)
            setTimeout(myConfetti(), 1000)
            setTimeout(myConfetti(), 2000)
        }
    }
}


// local storage

let bestTime = localStorage.getItem("best")
if (bestTime == null) {
    best.innerHTML = "-"
} else {
    best.innerHTML = getTime(bestTime)
}
let lastTime = localStorage.getItem("last")
if (lastTime == null) {
    last.innerHTML = "-"
} else {
    last.innerHTML = getTime(lastTime)
}

function getTime(n) {
    let mins = Math.floor(n / 60) < 10 ? `0${Math.floor(n / 60)}` : Math.floor(n / 60)
    let secs = n % 60 < 10 ? `0${n % 60}` : n % 60
    return `${mins}:${secs}`
}

function myConfetti() {
    confetti({
        particleCount: 200,
        spread: 350,
        origin: { y: 0.5 }
    });
}

/// to loop background music

setInterval(()=>{
    if(bgm.currentTime == bgm.duration){
        bgm.currentTime = 0 
        bgm.play()
    }
},10)
