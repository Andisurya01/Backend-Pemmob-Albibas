require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/shoes', productRoutes);
app.use('/highlight', highlightRoutes);

const PORT = 3200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
