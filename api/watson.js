/*
APIKEY for food db: LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH

https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH&location=Denver+CO
*/
var watson = require('watson-developer-cloud');
var fs = require('fs');
var Base64Decode = require('base64-stream').decode;
var base64Img = require('base64-img');
var hri = require('human-readable-ids').hri;


const WatsonAPI = function(stringImage){

  var visual_recognition = watson.visual_recognition({
    api_key: 'de73bb0daa7a4ec91ad49355fac9c0d893a252a3',
    version: 'v3',
    version_date: '2016-05-20'
  });

  var id = hri.random();
  const reg = /^data:image\/(\w+);base64,([\s\S]+)/;
  let ext = stringImage.substring(0, 30).match(reg);
  if (ext) {
    ext = '.'+ext[1];
  } else {
    ext = '.jpg';
  }
  
  base64Img.imgSync(stringImage, 'image', id, function(err, filepath) {
    console.log(filepath, err)
  });

  let parameters = {
    //classifier_ids: ["fruits_1462128776","SatelliteModel_6242312846"],
    classifier_ids: ["food"],
    threshold: 0.6
  };
  
  var params = {
    images_file: fs.createReadStream(`./image/${id+ext}`),
    parameters: parameters
  };
  
  return visual_recognition.classify(params, function(err, response) {
    if (err) return console.log(err);
    //console.log(JSON.stringify(response, null, 2))
    try {
      var args = response.images[0].classifiers[0].classes;
      var newList = []
      args.forEach(function(element) {
        newList.push({name: element.class, probability: element.score});
      });
      return {data: newList};
    } catch(e) {
      return {error: e}
    }

  });
}
export default WatsonAPI;
