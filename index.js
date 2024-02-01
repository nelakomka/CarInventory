const myArray = [];

//resizing the images
document.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    if (event.target.style.width === '100px') {
      event.target.style.width = '300px';
    } else {
      event.target.style.width = '100px';
    }
  }
});

function onSubmit(event) {
  //submit and push the car object into array
  event.preventDefault();

  const formData = new FormData(event.target);
  const formValues = Object.fromEntries(formData);

  myArray.push(formValues);

  displayCars();
}

//display the cars
function displayCars() {
  const getCarsDiv = document.querySelector('.cars');

  //to get rid of multiple displays of entries of the same data, clear the div
  getCarsDiv.replaceChildren([]);

  //in order for ascensing and descending to work, cars need to be displayed through looping
  for (let i = 0; i < myArray.length; i++) {
    const car = myArray[i];

    const newDiv = document.createElement('div');
    const newName = document.createElement('span');
    const newModel = document.createElement('span');
    const newYear = document.createElement('span');
    const newPrice = document.createElement('span');
    const newQuantity = document.createElement('span');
    const newColor = document.createElement('span');
    const newImage = document.createElement('img');

    newName.innerHTML = `Name: ${car.name} `;
    newModel.innerHTML = `Model: ${car.model} `;
    newYear.innerHTML = `Year: ${car.year} `;
    newPrice.innerHTML = `Price: ${car.price} `;
    newQuantity.innerHTML = `Quantity: ${car.quantity} `;
    newColor.innerHTML = `Color: ${car.color} `;
    newImage.src = car.image;

    newDiv.appendChild(newName);
    newDiv.appendChild(newModel);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newPrice);
    newDiv.appendChild(newQuantity);
    newDiv.appendChild(newColor);
    newDiv.appendChild(newImage);

    getCarsDiv.appendChild(newDiv);
  }
}

//calculate total price
function calcTotalPriceAndQuant() {
  const getPriceParagraph = document.querySelector('.price');
  const getQuantityParagraph = document.querySelector('.quantity');

  const totalPrice = myArray.reduce(
    (total, element) =>
      total + Number(element.price) * Number(element.quantity),
    0,
  );

  const totalQuantity = myArray.reduce(
    (total, element) => total + Number(element.quantity),
    0,
  );

  getPriceParagraph.innerHTML = `Total Price: ${totalPrice}`;
  getQuantityParagraph.innerHTML = `Total Quantity: ${totalQuantity}`;

  displayHighestPrice();
  displayLowestPrice();
}

//display the car with the highest price (does not include quantity)
function displayHighestPrice() {
  const getHighestPriceParagraph = document.querySelector('.highest_price');

  //get the highest price property in an array of objects
  const highestPrice = myArray.reduce(
    (acc, element) => (acc.price > element.price ? acc : element),
    {},
  );

  getHighestPriceParagraph.innerHTML = `
          <br />Highest Price car: <br />
          Name: ${highestPrice.name} <br />
          Model: ${highestPrice.model} <br />
          Year: ${highestPrice.year} <br />
          Price: ${highestPrice.price} <br />
          Quantity: ${highestPrice.quantity}
        `;
}

function displayLowestPrice() {
  const getLowestPriceParagraph = document.querySelector('.lowest_price');

  //get the lowest price property in an array of objects
  const lowestPrice = myArray.reduce(
    (acc, element) => (acc.price < element.price ? acc : element),
    {},
  );

  getLowestPriceParagraph.innerHTML = `
          <br />Lowest Price car: <br />
          Name: ${lowestPrice.name} <br />
          Model: ${lowestPrice.model} <br />
          Year: ${lowestPrice.year} <br />
          Price: ${lowestPrice.price} <br />
          Quantity: ${lowestPrice.quantity}
        `;
}

function sortAscending() {
  myArray.sort((a, b) => a.price - b.price);
  displayCars();
}

function sortDescending() {
  myArray.sort((a, b) => b.price - a.price);
  displayCars();
}

function averagePrice() {
  const getAverageParagraph = document.querySelector('.average');

  //I couldnt transfer totalPrice into averagePrice so I just redid the calculations here
  const totalPrice = myArray.reduce(
    (total, element) =>
      total + Number(element.price) * Number(element.quantity),
    0,
  );

  const calcAverage = totalPrice / myArray.length;

  getAverageParagraph.innerHTML = `The Average Price is: ${calcAverage}`;
}
