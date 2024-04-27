require('dotenv').config( { path: './.env'});

const express = require('Express');
const app = express();
const PORT = 8080;

const morgan = require('morgan');
app.use(morgn('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const client = require('./db/client')
client.connect();

require('dotenv').config({path: './.env'})
const cookieParser = require('cookie-parser')
app.use(cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
    res.send('Hello Local Business World!')
});

app.use('/api', require('./api'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});