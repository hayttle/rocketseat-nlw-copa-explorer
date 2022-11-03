const matches = []
const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

// fetch("./assets/matches.json")
//   .then((res) => res.json())
//   .then((data) => {

//     data.forEach((match) => {
//       const date = new Date(match.DateUtc)
//       const day = date.getDate()
//       const month = date.getMonth() + 1
//       const hour = date.getHours()
//       const minutes = date.getMinutes()
//       const dayOfWeek = date.getDay()

//       matches.push({
//         homeTeam: match.HomeTeam,
//         day: day,
//         month: month,
//         hour: hour,
//         minutes: minutes,
//         dayOfWeek: daysOfWeek[dayOfWeek],
//         awayTeam: match.AwayTeam,
//       })
//     })
//   })

function createGame(player1, hour, player2) {
  return `
    <li>
      <img src="./assets/flags/${player1}.svg" alt="Bandeira do ${player1}" class="flag" title="${player1}">
      <strong>${hour}</strong>
      <img src="./assets/flags/${player2}.svg" alt="Bandeira do ${player2}" class="flag" title="${player2}">
    </li>
  `
}

function createCard(date, day, games) {
  return `
      <div class="card">
        <h2>${date} <span>${day}</span></h2>
        <ul>
          ${games}
        </ul>
      </div>
  `
}

document.querySelector("#app").innerHTML = `
<header>
      <img src="./assets/img/logo.svg" alt="" class="Logo da NLW">
    </header>
    <main id="cards">
      ${createCard("20/11", "quinta", createGame("qatar", "13:00", "ecuador"))}      
      ${createCard(
        "21/11",
        "segunda",
        createGame("england", "10:00", "iran") +
          createGame("senegal", "13:00", "netherlands") +
          createGame("united-states", "16:00", "wales")
      )}
    </main>
`
