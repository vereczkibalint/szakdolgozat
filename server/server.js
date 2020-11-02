const express = require('express');
const helmet = require('helmet');

const app = express();

const connectToMongoDB = require('./config/db');
const lecturerRouter = require('./routes/lecturer.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.use('/api/lecturers', lecturerRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`A szerver elindult a(z) ${PORT} porton!`));