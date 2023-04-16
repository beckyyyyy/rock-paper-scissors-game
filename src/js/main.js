const GAME_STATE = {
  GameStart: "GameStart",
  UserPlay: "UserPlay",
  ComputerPlay: "ComputerPlay",
  GameEnd: "GameEnd",
}

const stepOne = document.querySelector("#stepOne")
const stepTwo = document.querySelector("#stepTwo")
const stepThree = document.querySelector("#stepThree")
const userThrow = document.querySelector("#user-throw")
const computerThrow = document.querySelector("#computer-throw")
const userResult = document.querySelector("#user-result")
const computerResult = document.querySelector("#computer-result")
const resultTitle = document.querySelector("#result-title")
const score = document.querySelector("#score")
const playAgainBtn = document.querySelector("#playAgain-btn")
const ruleBtn = document.querySelector("#rule-btn")
const ruleBox = document.querySelector(".rule-box")
const closeBtn = document.querySelector("#close-btn")

let currentState = GAME_STATE.GameStart
let userPlay = ""
let computerPlay = ""
let winner = ""
let currentScore = 0

// function
// 不同階段顯示不同畫面
const displayPlayground = () => {
  if (currentState === "GameStart") {
    stepOne.classList.remove("d-none")
    stepThree.classList.add("d-none")
  } else if (currentState === "UserPlay") {
    stepTwo.classList.remove("d-none")
    stepOne.classList.add("d-none")
    displayUserThrow()
  } else if (currentState === "ComputerPlay") {
    setTimeout(displayComputerThrow, 2000)
  } else {
    stepTwo.classList.add("zoomerOut")
    setTimeout(() => {
      stepThree.classList.remove("d-none")
      stepTwo.classList.add("d-none")
      displayGameResult()
    }, 1000)
  }
}

// 開始猜拳，點任一拳，進入 GAME_STATE = "UserPlay"
const throwPunch = (event) => {
  const play = event.target.dataset.play
  switch (play) {
    case "paper":
      userPlay = "paper"
      break
    case "scissors":
      userPlay = "scissors"
      break
    case "rock":
      userPlay = "rock"
      break
  }
  currentState = GAME_STATE.UserPlay
  displayPlayground()
}

// 顯示玩家所選的拳，進入GAME_STATE = "ComputerPlay"
const displayUserThrow = () => {
  userThrow.innerHTML = `
      <div class="${userPlay}__big-circle">
        <img src="src/images/icon-${userPlay}.svg" alt="icon-${userPlay}">
      </div>
    `
  currentState = GAME_STATE.ComputerPlay
  displayPlayground()
}

// 電腦隨機出拳
const randomComputerThrow = () => {
  const randomIndex = Math.floor(Math.random() * 3)
  const throws = ["paper", "scissors", "rock"]
  computerPlay = throws[randomIndex]
}

// 顯示玩家所選的拳，進入GAME_STATE = "GameEnd"
const displayComputerThrow = () => {
  randomComputerThrow()
  computerThrow.innerHTML = `
    <div class="${computerPlay}__big-circle zoomer">
      <img src="src/images/icon-${computerPlay}.svg" alt="icon-${computerPlay}">
    </div>
  `
  currentState = GAME_STATE.GameEnd
  setTimeout(displayPlayground, 1500)
}

// 判斷誰是贏家
const winnerIs = () => {
  if (userPlay === computerPlay) {
    winner = ""
    return
  } else if (userPlay === "paper") {
    computerPlay === "scissors" ? (winner = "computer") : (winner = "user")
  } else if (userPlay === "scissors") {
    computerPlay === "rock" ? (winner = "computer") : (winner = "user")
  } else if (userPlay === "rock") {
    computerPlay === "paper" ? (winner = "computer") : (winner = "user")
  }
}

// 顯示遊戲結果
const displayGameResult = () => {
  winnerIs()
  let userResultHtml = ``
  let computerResultHtml = ``
  userResultHtml = `
    <div class="${userPlay}${winner === "user" ? "__win" : "__big-circle"}">
      <img src="src/images/icon-${userPlay}.svg" alt="icon-${userPlay}">
    </div>
  `
  computerResultHtml = `
    <div class="${computerPlay}${
    winner === "computer" ? "__win" : "__big-circle"
  }">
      <img src="src/images/icon-${computerPlay}.svg" alt="icon-${computerPlay}">
    </div>
  `
  userResult.innerHTML = userResultHtml
  computerResult.innerHTML = computerResultHtml
  if (winner === "user") {
    resultTitle.textContent = "YOU WIN"
    currentScore++
  } else if (winner === "computer") {
    resultTitle.textContent = "YOU LOSE"
  } else {
    resultTitle.textContent = "EVEN"
  }
  score.textContent = currentScore
}

// 點擊play again按鈕，回到GameStart
const handlePlayAgainClick = () => {
  currentState = GAME_STATE.GameStart
  computerThrow.innerHTML = `<div class="big-circle computer-animate"></div>`
  winner = ""
  stepTwo.classList.remove("zoomerOut")
  displayPlayground()
}

// 開啟/關閉說明規則視窗
const displayRule = () => {
  ruleBox.classList.remove("d-none")
}
const closeRule = () => {
  ruleBox.classList.add("d-none")
}

// addEventlistener
// 監聽stepOne 點擊剪刀、石頭、布
stepOne.addEventListener("click", throwPunch)
// 監聽play again按鈕
playAgainBtn.addEventListener("click", handlePlayAgainClick)
// 監聽開啟/關閉說明規則視窗按鈕
ruleBtn.addEventListener("click", displayRule)
closeBtn.addEventListener("click", closeRule)
