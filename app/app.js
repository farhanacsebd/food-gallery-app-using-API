// spinners 
const toggleSpinner = displaySpinner =>{
  document.getElementById('spinner').style.display = displaySpinner;  
}
const toggleCard = displaySpinner =>{
  document.getElementById('card').style.display = displaySpinner;  
}

// searching input
const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);

  //add spinner
  toggleSpinner('block')
  toggleCard('none')
  // clear the input field
  searchField.value = "";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchFood(data.meals));
};

// display the card
const displaySearchFood = (datas) => {
  const foodCard = document.getElementById("foodCard");
  foodCard.textContent = "";
  datas.forEach((data) => {
    console.log(data);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="col shadow">
              <div class="card h-100 text-center">
                <img  style="height: 250px;width: 300px;" src="${data.strMealThumb}" class="card-img-top p-2" alt="...">
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
  //add spinner
  toggleSpinner('none')
  toggleCard('block')
};

const detailsInfo = (idMeal) => {
  // console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetailsInfo(data.meals[0]));
};

const displayDetailsInfo = (meals) => {
  // console.log(meals);
  const ditailInfo = document.getElementById("ditailInfo");
  ditailInfo.textContent = "";
  const div = document.createElement("div");
  div.classList.add("modal-body");
  div.innerHTML = `
          <img style="height: 150px;" class="rounded-circle mb-3" src="${meals.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h4>${meals.strMeal}</h4>
            <h6 class="bg-white p-2 text-danger fw-bold">Famous for ${meals.strArea}</h6>
            <h5>Instructions:</h5>
            <p class="card-text fw-bold">${meals.strInstructions.slice(0, 200)}</p>
            <a href="${meals.strYoutube}" class="btn btn-danger">Watch Video</a>
          </div>
      `;
  ditailInfo.appendChild(div);
};