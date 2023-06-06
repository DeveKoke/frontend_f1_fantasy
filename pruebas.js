//* FUNCION PARA CREAR TARJETAS NUEVAS DESDE LA TARJETA ORIGINAL CON BOTÓN ORIGINAL
// Obtener los elementos necesarios del DOM
const cards = document.querySelector('.cards-container');
const selectButton = document.querySelector('.btn-select');
const containers = document.querySelectorAll('.sec-driver');

// Variable para llevar el seguimiento del número de clics
let clickCounter = 0;

// Agregar el evento de clic a cada botón SELECT
selectButton.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Asegurarse de que haya suficientes containers para el número de clics
    if (clickCounter < containers.length) {
      // Obtener la información de la card seleccionada
      const selectedCard = cards[index];
      const selectedImage = selectedCard.querySelector('img').src;
      const selectedName = selectedCard.querySelector('h3').textContent;

      // Crear una nueva card con la información seleccionada
      const newCard = document.createElement('div');
      newCard.classList.add('card');
      const newImage = document.createElement('img');
      newImage.src = selectedImage;
      newImage.alt = "Imagen seleccionada";
      const newName = document.createElement('h3');
      newName.textContent = selectedName;
      newCard.appendChild(newImage);
      newCard.appendChild(newName);

      // Agregar la nueva card al contenedor correspondiente
      containers[clickCounter].appendChild(newCard);

      // Incrementar el contador de clics
      clickCounter++;
    }
  });
});

//* FUNCIÓN PARA EL BOTÓN DELETE DRIVER
const element = document.getElementById('myElement');
element.remove();
