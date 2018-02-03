// You can call the Predict API with the 'Food' model. Simply pass in an image input with a publicly accessible URL 
// or by directly sending image bytes.

const Clarifai = require('clarifai');

const ClarifaiAPI = async function(picture){
    const app = new Clarifai.App({
        apiKey: 'bca7d7576a33432bb12f40bb975465e5'
    });
    // using the "Food" model
    const processData = await app.models.predict("bd367be194cf45149e75f01d59f77ba7", {base64: picture}).then(
        function(response) {
            var args = response.outputs[0].data.concepts;
            var newList = []
            args.forEach(function(element) {
                newList.push({name: element.name, probability: element.value});
            });
            return newList;
        },
        function(err) {
            return err;
        }
    );
    return processData;
}

export default ClarifaiAPI;