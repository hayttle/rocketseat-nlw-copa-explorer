const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

const playerNotDefined = [
  "1A",
  "2A",
  "1B",
  "2B",
  "1C",
  "2C",
  "1D",
  "2D",
  "1E",
  "2E",
  "1F",
  "2F",
  "1G",
  "2G",
  "1H",
  "2H",
  "To be announced",
]

const cardsContainer = document.querySelector("#cards")
const themeContainer = document.querySelector("#theme")

const changeColorTheme = (colorTheme) => {
  document.body.className = colorTheme
}

let delay = -0.3

const createCard = (day, nameDayOfWeek) => {
  delay += 0.3
  return `
  <div class="card" style="animation-delay: ${delay}s">
    <h2>${day} <span>${nameDayOfWeek}</span></h2>
    <ul data-js=${day}>
    </ul>
  </div>
  `
}

const createGame = (player1, hour, player2) => {
  return `
  <li>
  <div class="teamName">
    <img src="./assets/img/flags/${
      playerNotDefined.some((v) => player1 === v) ? "wait" : player1.toLowerCase()
    }.svg" alt="Bandeira do ${player1}" class="flag">
    <p>${player1.toUpperCase().replace("-", " ")}</p>
    </div>
    <strong>${hour}</strong>
    <div class="teamName">
    <img src="./assets/img/flags/${
      playerNotDefined.some((v) => player2 === v) ? "wait" : player2.toLowerCase()
    }.svg" alt="Bandeira do ${player2}" class="flag">
    <p>${player2.toUpperCase().replace("-", " ")}</p>
    </div>
  </li>
  `
}
const mapDataFromArrayGames = () => {
  games.forEach((game) => {
    const dateTime = new Date(game.DateUtc)
    const date = `${dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate()}/${dateTime.getMonth() + 1}`
    const time = `${dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours()}:${
      dateTime.getMinutes() === 0 ? "00" : ""
    }`
    const dayOfWeek = dateTime.getDay()
    game.date = date
    game.time = time
    game.dayOfWeek = daysOfWeek[dayOfWeek]
  })
}

mapDataFromArrayGames()

const groupData = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

const gamesGroupedByDate = groupData(games, "date")

const renderGames = () => {
  let htmlContent = ""

  for (const date in gamesGroupedByDate) {
    const gamesOnTheDate = gamesGroupedByDate[date]
    const nameDayOfWeek = gamesOnTheDate[0].dayOfWeek
    cardsContainer.innerHTML += createCard(date, nameDayOfWeek)

    htmlContent = ""

    for (const game in gamesOnTheDate) {
      const {HomeTeam, time, AwayTeam} = gamesOnTheDate[game]
      htmlContent += createGame(HomeTeam, time, AwayTeam)
    }

    document.querySelector(`[data-js='${date}']`).innerHTML += htmlContent
  }
}

themeContainer.addEventListener("click", (event) => {
  const colorTheme = event.target.id
  changeColorTheme(colorTheme)
})

renderGames()