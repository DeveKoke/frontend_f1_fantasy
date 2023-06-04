//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE   ---------------------------------
const menu = document.getElementById('menu')
const menuIcon = document.getElementById('menu_icon')
const menuUl = document.createElement('ul'); 
menuUl.setAttribute('class','menu_ul');

menuIcon.addEventListener('click', () => {
  const menuItems = `
  <li><a href="home.html">YOUR TEAM</a></li>
  <li><a href="resultados.html">RESULTS</a></li>
  <li><a href="liga.html">LEAGUE</a></li>
`;
if (menuUl.style.display === 'none') {
  setTimeout(function() {
    menu.style.opacity = '1';
  }, 100);
  menuUl.style.display = 'flex';
  menu.style.borderTop = 'solid';
  menu.style.borderTopColor = 'rgb(203, 25, 25)';
} else {
  // setTimeout(function() {
  //   menu.style.opacity = '1';
  // }, 2000);
  menuUl.style.display = 'none';
  menu.style.borderTop = 'none';
}
menu.appendChild(menuUl);
menuUl.innerHTML= menuItems;
});



//* Crear identificador usuario en nav
// function createUserBar(userName){
//   const header = document.getElementById('headerHome');
//   let user_idBar = `<div class="idBar">
//                   <p>Hello, ${userName}</p>
//                   </div>`;
//   header.innerHTML += user_idBar;
// }



// * FUNCIÓN PARA ACCEDER A API Y PINTAR TARGETA PILOTO    -------------------------
var arrIndex = 0;
const driversList = ["vers","per","lec","sai","lew","russ","alo","stro","oco","gas","nor","pia","bot","zho","tsu","vri","hul","mag","alb","sar"];

async function getDriverInfoCard(driverId) {
  try{
      await fetch(`https://v1.formula-1.api-sports.io/drivers?search=${driverId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
          "x-rapidapi-key": "8cd55f4fc36d00125765355eaf63e045"
        }
      })
      .then(response => {
        let data = response.json();
        let driverName = data.response.name;
        let driverImg = data.response.image;
        let driverNumber = data.response.number;
        let driverCountry= data.response.country.name;
        let driverChamps = data.response.world_championships;
        let driverRaces = data.response.grands_prix_entered;
        let driverVic = data.response.highest_race_finish.number;
        let driverPodiums = data.response.podiums;
        let driverPoints = data.response.career_points;
        cardContainer = document.querySelector('#carousel-wrapper');
        carouselCards = document.createElement('article');
        let driverCard = ` <h2>${driverName}</h2>
        <img src="${driverImg}" alt="piloto ${driverName}">
        <p>Number: ${driverNumber}</p>
        <p>Country: ${driverCountry}</p>
        <p>World Championships: ${driverChamps}</p>
        <p>Races: ${driverRaces}</p>
        <p>Victories: ${driverVic}</p>
        <p>Podiums: ${driverPodiums}</p>
        <p>Carrer Points: ${driverPoints}</p>`
        carouselCards.innerHTML = driverCard;
        cardContainer.appendChild(carouselCards);
        
      })
      .catch(err => {
        console.log(err);
      });
  }catch (error) {
    console.error(error);
  }
}

// * FUNCIÓN PARA BOTONES R&L  DEL CARRUSEL   --------------------------------------
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

function getDriverApiRight() {
  arrIndex ++;
  if (arrIndex > 19) {
    arrIndex = 0; 
  }
  let driverName = driversList[arrIndex]
  console.log(driverName);
  getDriverInfoCard(driverName)    
}
function getDriverApiLeft() {
  arrIndex --;
  if (arrIndex < 0) {
    arrIndex = 19;
  }
  let driverName = driversList[arrIndex]
  console.log(driverName);
  getDriverInfoCard(driverName) 
}

btnRight.addEventListener("click",getDriverApiRight);
btnLeft.addEventListener("click", getDriverApiLeft);





