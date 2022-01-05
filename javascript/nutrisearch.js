
function createNode(element) {
    return document.createElement(element);
};

function appendNode(parent, el) {
    return parent.appendChild(el);
};

async function apiSearch() {

    const edamamId = "e3d355ba";
    const edamamKey = "67961828f045b54be7e5687dee059d6b";

    var userInput = document.getElementById('recipe-find-search').value;

    const edamamUrl = `https://api.edamam.com/search?q=${userInput}&app_id=${edamamId}&app_key=${edamamKey}`;

    const ul = document.getElementById('recipe-display');
    const resulthits = document.getElementById('hit-counter');

    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }

    if (resulthits.length != 0) {
        resulthits.innerHTML = "";
    }

    await fetch(edamamUrl).then(r => r.json()).then(function(data) {
        let recipes = data.hits
        console.log(edamamUrl);
        console.log(recipes)
        console.log(recipes.length)
        if (recipes.length === 0) {
            resulthits.innerHTML = "No results found."
            } else {
                return recipes.map(function(recipe) {
                let li = createNode('li');
                let img = createNode('img');
                let title = createNode('h3');
                let nutrp = createNode('p');
                img.src = recipe.recipe.image;
                title.innerHTML = `${recipe.recipe.label}`;
                nutrp.innerHTML = 
                    `Calories: ${Math.round(recipe.recipe.totalNutrients.ENERC_KCAL.quantity)} ${recipe.recipe.totalNutrients.ENERC_KCAL.unit} 
                    <br> Protein: ${Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)} ${recipe.recipe.totalNutrients.PROCNT.unit} 
                    <br> Carbs: ${Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)} ${recipe.recipe.totalNutrients.CHOCDF.unit}
                    <br> Fats: ${Math.round(recipe.recipe.totalNutrients.FAT.quantity)} ${recipe.recipe.totalNutrients.FAT.unit}`;
                appendNode(li, title);
                appendNode(li, img);
                appendNode(li, nutrp);
                appendNode(ul, li);
            })
        }
    })
};