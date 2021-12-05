import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/coderhouseTP', { useNewUrlParser: true }, function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conectado a MongoDB');
    }
});

export default mongoose; 