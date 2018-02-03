/*
APIKEY for food db: LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH

https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json?api_key=LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH&location=Denver+CO
*/

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

const WatsonAPI = function(imgFile){

    var visual_recognition = new VisualRecognitionV3({
        api_key: '<LUITmEEltJMaq6s75hXa1SGJIiWAhrn1MVKIikZH>',
        version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
      });
       
      var params = {
        images_file: imgFile
      };
       
      visual_recognition.classify(params, function(err, res) {
        if (err) {
          console.log(err);
        } else {
          return JSON.stringify(res, null, 2);
        }
    });
    
}
 
export default WatsonAPI;