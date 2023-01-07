const searchFood = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchFood(data.meals))
}

const displaySearchFood = datas =>{
    
    const foodCard = document.getElementById('foodCard');
    datas.forEach(data => {
        console.log(data);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = 
        `
        <div class="col shadow">
              <div class="card h-100">
                <img  style="height: 250px;width: 300px;" src="${data.strMealThumb}" class="card-img-top p-2" alt="...">
                <div class="card-body">
                  <h5 class="card-title text-center">${data.strMeal}</h5>
                  <p class="card-text">${data.strInstructions.slice(0,150)}</p>
                </div>
              </div>
            </div>
        `
        foodCard.appendChild(div)
    });
}