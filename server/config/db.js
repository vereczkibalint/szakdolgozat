require('dotenv').config();
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB kapcsolás sikeres!');
    } catch(error) {
        console.error(`Hiba a MongoDB csatlakozáskor: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectToMongoDB;