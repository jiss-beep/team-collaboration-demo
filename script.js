// Wait for the page to load
window.addEventListener('load', () => {

    // 1. Get your new search button and input
    const searchButton = document.getElementById('food-search-btn');
    const searchInput = document.getElementById('food-search-input');
    
    // 2. Listen for a click on the new search button
    searchButton.addEventListener('click', () => {
        const query = searchInput.value; // This is what the student typed
        findFoodAllergens(query);
    });

    // OPTIONAL: Also listen for the 'Enter' key press in the input field
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = searchInput.value;
            findFoodAllergens(query);
        }
    });
});

/**
 * This is the main function.
 * It finds food, speaks allergens, and now shows an image, with robust
 * handling for variations in user input (case, punctuation, extra words).
 */
function findFoodAllergens(foodName) {
    // foodName is what the user searched for, e.g., "Chicken Adobo"

    // --- THIS IS THE MOST IMPORTANT PART ---
    // This is your database of campus food.
    const campusFoodDB = {
        "chicken adobo": {
            product_name_en: "Chicken Adobo",
            allergens_hierarchy: ["en:soy", "en:gluten"], // From soy sauce and wheat
            imageUrl: "assets/imgs/adobo.jpg"
        },
        "french fries": {
            product_name_en: "Stall Special Fries",
            allergens_hierarchy: [], // No common allergens
            imageUrl: "assets/imgs/fries.jpg"
        },
        "cheese sandwich": {
            product_name_en: "Cheese Sandwich",
            allergens_hierarchy: ["en:milk", "en:gluten"], // From cheese and bread
            imageUrl: "assets/imgs/cheese-sandwich.jpg"
        },
        "pesto pasta": {
            product_name_en: "Pesto Pasta",
            allergens_hierarchy: ["en:tree nuts", "en:milk"], // From pine nuts and cheese
            imageUrl: "assets/imgs/pesto-pasta.jpg"
        },
        "cappuccino": {
            product_name_en: "Cappuccino",
            allergens_hierarchy: ["en:tree nuts", "en:milk", "en:soy"], // From pine nuts and cheese
            imageUrl: "assets/imgs/cappuccino.jfif"
        }
    };

    // --- End of Database ---

    // Get the HTML elements to update
    const resultsDisplay = document.getElementById('results-display');
    const foodImage = document.getElementById('food-image');
    const defaultImage = "https://placehold.co/300x200/f0f0f0/ccc?text=Search+for+Food";

    // 1. IMPROVED NORMALIZATION: Clean up the user input aggressively
    //    (Handles case, punctuation, and extra spaces)
    const normalizedInput = foodName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove punctuation like !,?()
        .replace(/\s+/g, ' ')       // Replace multiple spaces with a single space
        .trim();

    // ... (rest of the findFoodAllergens function remains the same up to point 2)

    // 2. FIND THE BEST MATCH (PARTIAL MATCH):
    let foodItem = null;
    let lookupKey = null;
    
    // A. Check for known typo/synonym first:
    if (normalizedInput.includes("sandwhich") || normalizedInput.includes("cheese sand")) {
        foodItem = campusFoodDB["cheese sandwich"];
        lookupKey = "cheese sandwich";
    } 
    
    // B. Check for partial matches (Handles single words like "pesto" or "adobo")
    if (!foodItem) {
        // Iterate over the keys in your database (e.g., "chicken adobo", "french fries")
        for (const key in campusFoodDB) {
            
            // Check if the database KEY includes the user's normalized INPUT
            if (key.includes(normalizedInput)) { 
                foodItem = campusFoodDB[key];
                lookupKey = key;
                break;
            }
        }
    }

    // ... (rest of the findFoodAllergens function remains the same from point 3 onwards)


    // 3. Process the results (This part is similar to your original script!)
    if (foodItem) {
        let productName = foodItem.product_name_en;
        let allergens = foodItem.allergens_hierarchy;

        // Clean up the allergen names (e.g., "en:milk" -> "milk")
        let newtext = allergens.map(allergen => allergen.substring(3));

        let output = "";
        let speechOutput = "";
        if (newtext.length > 0) {
            output = `<strong>${productName}</strong><br><strong class="text-danger">Warning: Contains ${newtext.join(', ')}.</strong>`;
            speechOutput = `${productName} contains: ${newtext.join(', ')}, which are common allergens.`;
        } else {
            output = `<strong>${productName}</strong><br><strong class="text-success">No common allergens detected.</strong>`;
            speechOutput = `${productName} does not appear to contain common allergens.`;
        }

        // 4. Update the page (Text, Image, and Speech)
        resultsDisplay.innerHTML = output;
        foodImage.src = foodItem.imageUrl; // <-- SETS THE IMAGE

        let utterance = new SpeechSynthesisUtterance(speechOutput);
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);

    } else {
        // Food not found in your database
        let output = `Sorry, we could not find "${foodName}" in our database. Please try again.`;
        let speechOutput = `Sorry, we could not find ${foodName} in our database.`;

        // Reset the display
        resultsDisplay.innerHTML = output;
        foodImage.src = defaultImage; // <-- RESET IMAGE

        let utterance = new SpeechSynthesisUtterance(speechOutput);
        window.speechSynthesis.speak(utterance);
    }
}