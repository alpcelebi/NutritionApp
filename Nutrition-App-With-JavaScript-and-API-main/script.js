async function get_nutrition_by_name(food_name) {
    const url = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + food_name;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2df2273180msha95b2a2e309084dp1944b8jsnc44917ebd81a',
            'x-rapidapi-host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

async function get_send_data() {
    let content = $('#searchbox').val();
    let final_value = await get_nutrition_by_name(content);
    localStorage.setItem("sonuc", JSON.stringify(final_value));
    display_nutrition_info();
}

function display_nutrition_info() {
    let result = JSON.parse(localStorage.getItem("sonuc"));
    if (result && result.length > 0) {
        let food = result[0];
        $('#food_name').text(food.name.toUpperCase());
        $('#carbohydrates_total').text(food.carbohydrates_total_g + "g");
        $('#cholesterol_mg').text(food.cholesterol_mg + "mg");
        $('#fat_saturated_g').text(food.fat_saturated_g + "g");
        $('#fat_total_g').text(food.fat_total_g + "g");
        $('#fiber_g').text(food.fiber_g + "g");
        $('#potassium_mg').text(food.potassium_mg + "mg");
        $('#protein_g').text(food.protein_g + "g");
        $('#serving_size_g').text(food.serving_size_g + "g");
        $('#sodium_mg').text(food.sodium_mg + "mg");
        $('#sugar_g').text(food.sugar_g + "g");
    } else {
        $('#food_name').text("NOT FOUND");
    }
}

$(document).ready(function() {
    $('#mybutton').on('click', get_send_data);
    display_nutrition_info(); // Sayfa yüklendiğinde localStorage'dan veri alıp gösterme
});
