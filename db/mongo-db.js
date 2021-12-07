import mongoose from 'mongoose';
import config from '../config.js'

let url = "";
let options = {};

if(config.mongo.useLocal) {
    url = config.mongo.local.url;
    options = { useNewUrlParser: true };
}
else {
    url = config.mongo.compass.uri;
    options = { useNewUrlParser: true, useUnifiedTopology: true };
}

mongoose.connect(url, options, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});

export default mongoose; 