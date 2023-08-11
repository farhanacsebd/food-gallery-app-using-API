// spinners
const toggleSpinner = (displaySpinner) => {
  document.getElementById("spinner").style.display = displaySpinner;
};
// when spinner show then card will hidden
const toggleCard = (displaySpinner) => {
  document.getElementById("card").style.display = displaySpinner;
};

// empty box
const emptyBox = (displayAlert) => {
  document.getElementById("emptyBox").style.display = displayAlert;
};

// No Result
const noResult = (displayAlert) => {
  document.getElementById("noResult").style.display = displayAlert;
};

// searching input
const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);

  if (searchText === "") {
    // console.log('hello');
    emptyBox("block");
    noResult("none"); //if empty search press then noresult will be no result
    toggleCard("none"); //card is not show
    document.getElementById('SearchTitle').style.display = 'none';
  } else {
    //add spinner
    toggleSpinner("block");
    toggleCard("none");

    // emptybox search or no result
    emptyBox("none");
    noResult("none");
     // this is only search result 
     document.getElementById('SearchTitle').style.display = 'none';

    // clear the input field
    searchField.value = "";

    // fetch the url
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchFood(data.meals));
  }
};

// display the card
const displaySearchFood = (datas) => {
  const foodCard = document.getElementById("foodCard");

  // remove the previous card
  foodCard.textContent = "";

  // no result alert
  if (datas === null) {
    console.log("null value");
    toggleSpinner("none");
    noResult("block");
  }
  datas.forEach((data) => {
    console.log(data);

     // this is only search result 
     document.getElementById('SearchTitle').style.display = 'block';

    // create card
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="col shadow my-5">
              <div class="card h-100 text-center">
                <img style="height: 300px;" src="${data.strMealThumb}" class="card-img-top p-2 rounded" alt="...">
                <div class="card-body">
                  <h5 class="card-title mb-3">${data.strMeal}</h5>
                  <!-- Button trigger modal -->
                  <button  onclick="detailsInfo(${data.idMeal})" type="button" class="btn btn-danger rounded-pill text-white fw-bold p-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                   Get Recipe
                  </button>
                </div>
              </div>
            </div>
        `;
    foodCard.appendChild(div);
  });

  // no result alert
  noResult("none");
  //add spinner
  toggleSpinner("none");
  toggleCard("block");
};

//this function call by button
const detailsInfo = (idMeal) => {
  // console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetailsInfo(data.meals[0]));
};

const displayDetailsInfo = (meals) => {
  // console.log(meals);
  // new card start from here
  const ditailInfo = document.getElementById("ditailInfo");

  // remove the previous card
  ditailInfo.textContent = "";

  const div = document.createElement("div");
  div.classList.add("modal-body");
  div.innerHTML = `
          <img style="height: 150px;" class="rounded-circle mb-3" src="${
            meals.strMealThumb
          }" class="card-img-top" alt="...">
          <div class="card-body">
            <h4>${meals.strMeal}</h4>
            <h6 class="bg-white p-2 text-danger fw-bold">Famous for ${
              meals.strArea
            }</h6>
            <h5>Instructions:</h5>
            <p class="card-text fw-bold">${meals.strInstructions.slice(
              0,
              200
            )}....</p>
            <a href="${meals.strYoutube}" target="_blank" class="btn btn-danger">Watch Video</a>
          </div>
      `;
  ditailInfo.appendChild(div);
};