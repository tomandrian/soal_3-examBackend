var express = require('express');
var cors = require('cors')
var route = require('./route');


var app = express();
app.use(cors())
app.use(route);




app.get('/', (req, res) => {
    res.send('Got Data')
})



app.listen(3333, () => {
    console.log('Server aktif di port 3333 ')
});