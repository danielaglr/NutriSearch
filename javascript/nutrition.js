// if the return key is pressed in the search bar, run searchAPI()
var raw_input = document.getElementById("calorie-search-bar");

raw_input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) { // 13 represents the return key on the keyboard
event.preventDefault();
findAPIID();
}
});
/**
    * - call API to get ID
    * - use ID to get nutritional info about inputed food (ingredient search)
    * - receive & display information
    * - save results locally & modify (able to add macros of multiple ingredients)
*/
async function findAPIID(){
    resultsNumber = 6; // number of results I want for each search
    var userInput = document.getElementById("calorie-search-bar").value; // I don't know how to make a deep copy of raw_input, so I just call the method again
    const SPOONACULAR_API_KEY = `9e94d130a25f49baa470a7148cef08fe`;
    const SPOONACULAR_API_URL = `https://api.spoonacular.com/food/ingredients/search?query=${userInput}&apiKey=${SPOONACULAR_API_KEY}&number=${resultsNumber}`;
    let idNumber;
    
    // first searches the API for the ID of whatever inputed food
    await fetch(SPOONACULAR_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            /** saves ID numbers for each result from data in an array, 
             *  and then runs searchByID() several times, each time 
             *  with an element of that array (the ID number) as the parameter*/ 
            let idNumbers = [];
            for(k=0; k<resultsNumber; k++){
                idNumbers.push(data.results[k].id);
            }
            for(j=0; j<idNumbers.length; j++){
                searchByID(idNumbers[j]);
            }
            
        })
        .catch(error =>{
            // handle error
            alert("error found while fetching id for SPOONACULAR_API");
            console.log(error);
        });  
}

async function searchByID(foodIDNumber){
    console.log('searchByID() called')
    const SPOONACULAR_API_KEY = `9e94d130a25f49baa470a7148cef08fe`;
    const SPOONACULAR_ID_URL = `https://api.spoonacular.com/food/ingredients/${foodIDNumber}/information?apiKey=${SPOONACULAR_API_KEY}&amount=1`;
    console.log(SPOONACULAR_ID_URL);

    await fetch(SPOONACULAR_ID_URL)
        .then(idResponse => idResponse.json())
        .then(idData => {
            console.log(idData);
            /** need to loop through idResponse.json to get macro information
             *  carbs, protein, and fat (maybe sodium too)
             * - start at idData.nutrition.nutrients[0]
             * - check if the title equals 'Protein', 'Carbohydrates', or 'Fat'
             * - Display each of their respective amounts
             * */ 

            let count = 0;
            let macroCount = 0;
            let macroNames = ['Carbohydrates', 'Fat', 'Protein'];
            let macroObjects = [];
            while(count < idData.nutrition.nutrients.length){
                if( macroNames.includes(idData.nutrition.nutrients[count].name) ){
                    macroObjects.push(idData.nutrition.nutrients[count]);

                    macroCount++;
                    if( macroCount >= macroNames.length || count >= (idData.nutrition.nutrients.length - 1) ){

                        console.log("Found macros: ");
                        for(i=0; i<macroObjects.length; i++){
                            console.log("- " + macroObjects[i].name + ": " + macroObjects[i].amount + " " + macroObjects[i].unit);
                        }

                        break;
                    }
                    count++;
                }else{
                    count++;
                }
            }
            
        })
        .catch(error => {
            // handle error
            alert('error found while fetching nutrition info');
            console.log(error);
        });
}