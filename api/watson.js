/*
APIKEY for food db: LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH

https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH&location=Denver+CO
*/

const WatsonAPI = function(picture){
  var watson = require('watson-developer-cloud');
  var fs = require('fs');

  var visual_recognition = watson.visual_recognition({
    api_key: 'de73bb0daa7a4ec91ad49355fac9c0d893a252a3',
    version: 'v3',
    version_date: '2016-05-20'
  });

  let parameters = {
    //classifier_ids: ["fruits_1462128776","SatelliteModel_6242312846"],
    classifier_ids: ["food"],
    threshold: 0.6
  };
  
  var params = {
    //images_file: fs.createReadStream('./fruit2.jpg'),
    //images_file: fs.createReadStream('./fruit.png'),
    images_file: fs.createReadStream(picture),
    parameters: parameters
  };
  
  visual_recognition.classify(params, function(err, response) {
    if (err)
      return console.log(err);
    //console.log(JSON.stringify(response, null, 2))
    var args = response.images[0].classifiers[0].classes;
    var newList = []
    args.forEach(function(element) {
      newList.push({name: element.class, probability: element.score});
    });
    return console.log(newList)
  });
}

WatsonAPI('./fruit.png')
//export default WatsonAPI; 