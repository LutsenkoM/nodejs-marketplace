const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
// const { engine } = require('express-handlebars'); // Include Handlebars as the view engine

// Include pug as the view engine
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views', 'pug'));

// Include Handlebars as the view engine
// app.engine('handlebars', engine({
//     defaultLayout: 'main-layout',
//     layoutsDir: path.join(__dirname, 'views', 'handlebars', 'layouts')
// }));
// app.set('view engine', 'handlebars');
// app.set('views', path.join(__dirname, 'views', 'handlebars'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'ejs'));

const rootDir = require('./util/path');
// const adminRoutes = require('./routes/admin');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

// app.use(express.json());
// app.use(bodyParser.urlencoded()); // old version of body-parser
app.use(express.urlencoded({ extended: true })); // new version of body-parser
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(4000);
