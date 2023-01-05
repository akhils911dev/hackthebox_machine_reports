const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.json({Status: "Ok", Message: 'Read documentation from api in /documentation'});
})


app.use('/auth',require('./routes/auth'));
app.use('/client',require('./routes/client'));
app.use('/admin',require('./routes/admin'));
app.use('/documentation',require('./routes/documentation'));



app.listen(3000, '127.0.0.1');
console.log('Listen on http://localhost:3000');
