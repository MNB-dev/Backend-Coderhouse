import mongoose from 'mongoose';
import config from '../config.js'

mongoose.connect(config.mongo.local.url, { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});

export default mongoose; 