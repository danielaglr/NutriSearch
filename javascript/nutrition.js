
// if the return key is pressed in the search bar, run searchAPI()
var raw_input = document.getElementById("calorie-search-bar");
        
raw_input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) { // 13 represents the return key on the keyboard
event.preventDefault();
searchAPI();
}
});

async function searchAPI(){
    var user_input = document.getElementById("calorie-search-bar").value; // I don't know how to make a deep copy of raw_input, so I just call the method again
    alert(user_input); // temporary way to let me know that searchAPI() is being called
    const SPOONACULAR_API_KEY = `9e94d130a25f49baa470a7148cef08fe`;
    const SPOONACULAR_API = `https://api.spoonacular.com/food/ingredients/search?query=${user_input}&apiKey=${SPOONACULAR_API_KEY}&number=4`;


}