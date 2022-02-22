async function savedDisplay() {

    if (localStorage.getItem('recipe') !== null) { // Checks if local storage contains any saved recipes.
        savedRecipeRAW = JSON.parse(localStorage.getItem('recipe')); // Takes raw array and parses it.
        savedRecipe = savedRecipeRAW[1]; // Saves last element (recipe ID) from parsed array to variable.

        const display = document.getElementById('saved-recipes');

        const edamamID = "e3d355ba"; // URL variables for API
        const edamamKEY = "67961828f045b54be7e5687dee059d6b";
        const edamamURL = `https://api.edamam.com/api/recipes/v2/${savedRecipe}?type=public&app_id=${edamamID}&app_key=${edamamKEY}`;
        
        await fetch(edamamURL).then(r => r.json()).then(function(data) {
                let recipe = data;
                
                let li = createNode('li'); // Creates elements using previously established function.
                let img = createNode('img');
                let title = createNode('h3');
                let nutrp = createNode('p');

                img.src = recipe.recipe.image;
                title.innerHTML = `${recipe.recipe.label}`;
                nutrp.innerHTML = // Adds all nutritional information into body element of node using dot notation to navigate results returned in JSON format.
                    `Calories: ${Math.round(recipe.recipe.totalNutrients.ENERC_KCAL.quantity)} ${recipe.recipe.totalNutrients.ENERC_KCAL.unit} 
                    <br> Protein: ${Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)} ${recipe.recipe.totalNutrients.PROCNT.unit} 
                    <br> Carbs: ${Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)} ${recipe.recipe.totalNutrients.CHOCDF.unit}
                    <br> Fats: ${Math.round(recipe.recipe.totalNutrients.FAT.quantity)} ${recipe.recipe.totalNutrients.FAT.unit}`;

                appendNode(li, title); // Appends elements to parent elements (parent, child) using previously established function.
                appendNode(li, img);
                appendNode(li, nutrp);
                appendNode(display, li);
        }); 
    } else {
        console.log('recipe not found')
    }
};