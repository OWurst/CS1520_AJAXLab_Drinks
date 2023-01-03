// Global Variables 
var countriesListDropDown;
window.addEventListener('load', setup);
function setup() {
    let button = document.getElementById("button");
    button.addEventListener("click",displayDrinkInfo);
    displayDrinkInfo();
}

function displayDrinkInfo() {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    fetch(url)
        .then(res => res.json())
        .then(drinkData => {
            data = drinkData.drinks[0];
            document.getElementById("image-container").src = data.strDrinkThumb;
            document.getElementById("name").innerHTML = data.strDrink;
            document.getElementById("alcoholic").innerHTML = data.strAlcoholic;
            document.getElementById("category").innerHTML = data.strCategory;

            //////ingredients
            const ingredients = document.getElementById("ingredients");
            if (ingredients.hasChildNodes()) {
                ingredients.removeChild(ingredients.firstChild);
            }
            var list = document.createElement('ul');
            for(let i = 17; i < 32; i++)
            {
                let key = Object.keys(data)[i];
                if(data[key] != null) {
                    let ingredient = document.createElement('li');
                    
                    let key2 = Object.keys(data)[i+15];
                    ingredient.innerHTML = `${data[key]} - ${data[key2]}`

                    list.appendChild(ingredient);
                }
            }
            ingredients.appendChild(list);

            //instructions
            document.getElementById("instructions").innerHTML = data.strInstructions;
        })
}