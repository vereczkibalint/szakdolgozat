const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.get('/', (req, res) => {
    res.send('It works!');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`A szerver elindult a(z) ${PORT} porton!`));