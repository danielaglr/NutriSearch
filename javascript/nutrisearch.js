
function createNode(element) { // Function which can pass-through elements to create them in real time.
    return document.createElement(element);
};

function appendNode(parent, el) { // Function which appends child elements to parent elements.
    return parent.appendChild(el);
};

async function apiSearch() {

    const edamamId = "e3d355ba"; // URL variables for API
    const edamamKey = "67961828f045b54be7e5687dee059d6b";

    var userInput = document.getElementById('recipe-find-search').value; // Gets what the user inputted in the searchbar.

    const edamamUrl = `https://api.edamam.com/search?q=${userInput}&app_id=${edamamId}&app_key=${edamamKey}`; // Plugs user input and URL variables into API URL to prime for search.

    const ul = document.getElementById('recipe-display');

    while (ul.firstChild) { // When the recipe finder is run, removes any previous results that are being displayed.
        ul.removeChild(ul.firstChild);
    }

    if (!document.getElementById('nrf-alert-id').classList.contains('inactive')) { // Removes error message if displayed from previous search.
        document.getElementById('nrf-alert-id').classList.toggle('inactive')
    }

    await fetch(edamamUrl).then(r => r.json()).then(function(data) { // Uses API URL established previously to get results based on user input, returns in json format, and plugs data into a function.
        let recipes = data.hits
        console.log(recipes)
        if (recipes.length === 0) { // Checks if 0 results and if so, displays an error message.
            document.getElementById('nrf-alert-id').classList.toggle('inactive')
            } else {
                return recipes.map(function(recipe) { // Creates a new array function based on results.

                let li = createNode('li'); // Creates elements using previously established function.
                let img = createNode('img');
                let title = createNode('h3');
                let nutrp = createNode('p');
                let idInfo = createNode('p');
                let saveButton = createNode('button');

                img.src = recipe.recipe.image;
                title.innerHTML = `${recipe.recipe.label}`;
                nutrp.innerHTML = // Adds all nutritional information into body element of node using dot notation to navigate results returned in JSON format.
                    `Calories: ${Math.round(recipe.recipe.totalNutrients.ENERC_KCAL.quantity)} ${recipe.recipe.totalNutrients.ENERC_KCAL.unit} 
                    <br> Protein: ${Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)} ${recipe.recipe.totalNutrients.PROCNT.unit} 
                    <br> Carbs: ${Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)} ${recipe.recipe.totalNutrients.CHOCDF.unit}
                    <br> Fats: ${Math.round(recipe.recipe.totalNutrients.FAT.quantity)} ${recipe.recipe.totalNutrients.FAT.unit}`;
                var unsplitrecipeID = `${recipe.recipe.uri}`; // Recieves raw URI which contains recipe ID.
                var recipeIdentifier = unsplitrecipeID.split('_').pop(); // Takes raw URI and splits apart the section previous to the ID, returning only the ID.
                idInfo.innerHTML = `${recipeIdentifier}`;
                saveButton.id = 'save-recipe-btn';
                saveButton.innerHTML = 'SAVE';
                saveButton.onclick = function recipeSave() {
                    console.log('Recipe save ran!')
                    var recipeInfo = [
                        recipeName = `${recipe.recipe.label}`,
                        recipeID = `${recipeIdentifier}`
                    ];
                    window.localStorage.setItem('recipe', JSON.stringify(recipeInfo));
                    console.log(window.localStorage.getItem('recipe'));
                };

                appendNode(li, title); // Appends elements to parent elements (parent, child) using previously established function.
                appendNode(li, img);
                appendNode(li, nutrp);
                appendNode(li, idInfo);
                appendNode(li, saveButton);
                appendNode(ul, li);
            })
        }
    })
};
