const express = require('express');
const helmet = require('helmet');

const app = express();

const connectToMongoDB = require('./config/db');

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const thesisRouter = require('./routes/thesis.routes');
const milestoneRouter = require('./routes/milestone.routes');
const consultationRouter = require('./routes/consultation.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

connectToMongoDB();

app.get('/', (req, res) => {
    res.send('It works!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/theses', thesisRouter);
app.use('/api/milestones', milestoneRouter);
app.use('/api/consultations', consultationRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`A szerver elindult a(z) ${PORT} porton!`));

module.exports = app;