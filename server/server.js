const express = require('express');
const helmet = require('helmet');

const app = express();

const connectToMongoDB = require('./config/db');

const lecturerRouter = require('./routes/lecturer.routes');
const studentRouter = require('./routes/student.routes');
const thesisRouter = require('./routes/thesis.routes');
const milestoneRouter = require('./routes/milestone.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.use('/api/lecturers', lecturerRouter);
app.use('/api/students', studentRouter);
app.use('/api/theses', thesisRouter);
app.use('/api/milestones', milestoneRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`A szerver elindult a(z) ${PORT} porton!`));