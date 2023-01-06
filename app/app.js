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
    // console.log(datas);
    const foodCard = document.getElementById('foodCard');
    datas.forEach(data => {
        console.log(data);
    });
}