
// if the return key is pressed in the search bar, run searchAPI()
var raw_input = document.getElementById("calorie-search-bar");

raw_input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) { // 13 represents the return key on the keyboard
event.preventDefault();
searchAPI();
}
});

/**
    * - call API to get ID
    * - use ID to get nutritional info about inputed food (ingredient search)
    * - receive & display information
    * - save results locally & modify (able to add macros of multiple ingredients)
*/

async function searchAPI(){
    resultsNumber = 6; // number of results I want for each search

    var userInput = document.getElementById("calorie-search-bar").value; // I don't know how to make a deep copy of raw_input, so I just call the method again
    // alert(user_input); // temporary way to let me know that searchAPI() is being called
    const SPOONACULAR_API_KEY = `9e94d130a25f49baa470a7148cef08fe`;
    const SPOONACULAR_API_URL = `https://api.spoonacular.com/food/ingredients/search?query=${userInput}&apiKey=${SPOONACULAR_API_KEY}&number=${resultsNumber}`;
    let idNumber;
    
    // first searches the API for the ID of whatever inputed food, then searches the "search by ID" API for nutritional info about the inputed food
    await fetch(SPOONACULAR_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            idNumber = data.results[0].id;
            console.log(idNumber);
            const SPOONACULAR_ID_URL = `https://api.spoonacular.com/food/ingredients/${idNumber}/information?apiKey=${SPOONACULAR_API_KEY}&amount=1`;
            console.log(SPOONACULAR_ID_URL);

            fetch(SPOONACULAR_ID_URL)
                .then(idResponse => idResponse.json())
                .then(idData => {
                    console.log(idData);
                    /** need to loop through idResponse.json to get macro information
                     *  carbs, protein, and fat (maybe sodium too)
                     * - start at nutrition.nutrients[0]
                     * - check if the title equals 'Protein', 'Carbohydrates', or 'Fat'
                     * - Display each of their respective amounts
                     * */ 

                    
                });
        })
        .catch(error =>{
            // handle error
            alert("error found while fetching id for SPOONACULAR_API");
 
        });  
}