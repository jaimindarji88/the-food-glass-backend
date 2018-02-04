
//APIKEY for food db: LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH

var axios = require('axios');

const foodDatabase = function(foodID)
{
    //Performing a GET request
    //NutrientIDs = Total lipids (nutrient_id=204), calories (nutrient_id=208), carbohydrates (nutrient_id=205), and sugars (nutrient_id=269)
    return axios.get('https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=' + foodID).then(
        function(response){
            var args = response.data.report.foods[0].nutrients;
            var nutrients = []
            //console.log(args);
            args.forEach(function(element) {
                nutrients.push({Nutrient: element.nutrient, value: element.value + element.unit});
            })
            return nutrients
        }
    ); 
}
