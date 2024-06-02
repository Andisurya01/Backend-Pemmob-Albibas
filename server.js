require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

app.use('/auth', authRoutes);
app.use('/shoes', productRoutes);
app.use('/highlight', highlightRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
