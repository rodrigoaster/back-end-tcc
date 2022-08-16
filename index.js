const express = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/userRoutes')
app.use(userRoutes);

const calcRoutes = require('./routes/calcRoutes')
app.use(calcRoutes);


app.listen(8181, () => {
    console.log('deu certo pai, to ouvindo')
});